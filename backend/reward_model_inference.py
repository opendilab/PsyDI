from typing import List, Dict, Tuple
import os
import numpy as np
import torch
from ditk import logging
from scipy.stats import norm, rankdata
from einops import rearrange
from torch import einsum
from transformers import LlamaForSequenceClassification, LlamaTokenizer, DataCollatorWithPadding, PreTrainedTokenizerBase


class RewardDataCollatorWithPadding(DataCollatorWithPadding):
    tokenizer: PreTrainedTokenizerBase
    padding = 'max_length'
    max_length = None
    pad_to_multiple_of = None
    return_tensors = "pt"

    def __call__(self, features):
        batch = self.tokenizer.pad(
            features,
            padding=self.padding,
            max_length=self.max_length,
            pad_to_multiple_of=self.pad_to_multiple_of,
            return_tensors=self.return_tensors,
        )
        return batch


class RewardModel:

    def __init__(self):
        self.ei_dict = {'E': 1, 'I': -1}
        self.ns_dict = {'N': 1, 'S': -1}
        self.ft_dict = {'F': 1, 'T': -1}
        self.jp_dict = {'J': 1, 'P': -1}

        self.mbti_list = [
            'INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP',
            'ISFP', 'ESTP', 'ESFP'
        ]

        self.value_stat = {
            'INTJ': [-0.11353486983040184, 0.362304487395934],
            'INTP': [-0.17293065109110453, 0.3629959451950824],
            'ENTJ': [0.5007021536932147, 0.3591293712683699],
            'ENTP': [0.11266828463576212, 0.29974062275667357],
            'INFJ': [-0.9200727238213611, 0.35061573866534834],
            'INFP': [-1.1067285464806973, 0.3919526333760824],
            'ENFJ': [-0.07792353551230279, 0.29637179417784676],
            'ENFP': [-0.31545417352269095, 0.305993634662828],
            'ISTJ': [0.051241738370439986, 0.34300941486372666],
            'ISFJ': [-0.6274368114883832, 0.3183130078015884],
            'ESTJ': [0.6843549338079531, 0.3474468199693185],
            'ESFJ': [-0.08970891998410878, 0.3076223363900027],
            'ISTP': [-0.44336102736231525, 0.3431462537298136],
            'ISFP': [-0.8177371960390654, 0.38689841052740165],
            'ESTP': [0.2739025068718515, 0.2995300938121952],
            'ESFP': [-0.3959867829751027, 0.30950855067175376],
        }

        model_path = os.getenv("REWARD_MODEL_PATH", 'OpenDILabCommunity/PsyDI-RM-v0.1-zh')
        self.tokenizer = LlamaTokenizer.from_pretrained(model_path, trust_remote_code=True, device_map='sequential')
        self.tokenizer.pad_token_id = self.tokenizer.eos_token_id
        self.model = LlamaForSequenceClassification.from_pretrained(
            model_path,
            num_labels=4,
            trust_remote_code=True,
            revision='main',
            device_map='sequential',
            # You need to install flash_attn according to your environment settings, then enable this argument.
            # attn_implementation="flash_attention_2",
            torch_dtype=torch.bfloat16
        )
        print(f"Model size: {self.model.get_memory_footprint()} bytes")
        self.pads = RewardDataCollatorWithPadding(tokenizer=self.tokenizer, max_length=1024, pad_to_multiple_of=8)

        self.device = 'cuda' if torch.cuda.is_available() else 'cpu'

    def init_table(self, post_list: List[str]) -> Tuple[Dict[str, float], List[float], List[float]]:
        type_table = {}
        post_value_list = [None] * 16
        post_raw_reward = [None] * 16
        for idx, mbti in enumerate(self.mbti_list):
            prompt = f'请根据以下动态，判断该动态的用户有多大可能性被判定为{mbti}：'
            label = [self.ei_dict[mbti[0]], self.ns_dict[mbti[1]], self.ft_dict[mbti[2]], self.jp_dict[mbti[3]]]
            t_label = torch.FloatTensor(label).to(self.device)
            encoded_post_list = [{'input_ids': self.tokenizer.encode(prompt + post)} for post in post_list]
            batch = self.pads(encoded_post_list)
            raw_rewards = []
            rewards = []
            with torch.no_grad():
                for inputs in batch['input_ids']:
                    reshaped_inputs = inputs.reshape(1, inputs.shape[0]).to(self.device)
                    reward = self.model(input_ids=reshaped_inputs)[0][0]
                    raw_reward = reward * t_label
                    reward = (raw_reward).mean().item()
                    mean, std = self.value_stat[mbti]
                    reward = norm.cdf(reward, loc=mean, scale=std)
                    rewards.append(reward)
                    raw_rewards.append(raw_reward.cpu().numpy())
            post_value_list[idx] = rewards
            post_raw_reward[idx] = raw_rewards
            rewards = np.array(post_value_list[idx])
            type_table[mbti] = np.interp(rewards.mean(), [0, 1], [20, 50])
        for mbti in self.mbti_list:
            logging.info(f'------- {mbti}: {type_table[mbti]:.2f}%')
        return type_table, post_value_list, post_raw_reward

    def update_table(self, new_post: str, type_table: Dict[str, float]):
        new_value_list = []
        for idx, mbti in enumerate(self.mbti_list):
            prompt = f'请根据以下动态，判断该动态的用户有多大可能性被判定为{mbti}：'
            label = [self.ei_dict[mbti[0]], self.ns_dict[mbti[1]], self.ft_dict[mbti[2]], self.jp_dict[mbti[3]]]
            t_label = torch.FloatTensor(label).to(self.device)
            encoded_post_list = [{'input_ids': self.tokenizer.encode(prompt + new_post)}]
            batch = self.pads(encoded_post_list)
            with torch.no_grad():
                inputs = batch['input_ids'][0]
                reshaped_inputs = inputs.reshape(1, inputs.shape[0]).to(self.device)
                reward = self.model(input_ids=reshaped_inputs)[0][0]
                reward = (reward * t_label).mean().item()
                mean, std = self.value_stat[mbti]
                reward = norm.cdf(reward, loc=mean, scale=std)
                new_value_list.append(reward)

        for idx, mbti in enumerate(self.mbti_list):
            reward = new_value_list[idx]

            old_reward = type_table[mbti]
            weight = self.update_function(old_reward)
            new_reward = 2 * weight * reward - weight
            new_reward = min(max(0, old_reward + new_reward), 100)
            logging.info(f'------- {mbti}: {old_reward:.2f}% vs {100*reward:.2f}% * {weight:.2f} -> {new_reward:.2f}%')
            type_table[mbti] = new_reward
        return type_table

    def update_function(self, x: float) -> float:
        x1 = 50
        y1 = 25
        x2 = 80
        y2 = 10
        # y = k * x + b
        k = (y1 - y2) / (x1 - x2)
        b = (y2 * x1 - y1 * x2) / (x1 - x2)
        y = k * x + b
        y = min(max(3, y), 60)
        return y

    def select_post(self, post_list: List[str], post_raw_reward: List[str], top_mbti: List[str]) -> str:
        rank_list = None
        # find different index between top_mbti[0] and top_mbti[1]
        # 1 represents for different and 0 represents for the same
        # INFP/ISFJ -> [0,1,0,1]
        diff_index = [1 if top_mbti[0][i] != top_mbti[1][i] else 0 for i in range(4)]
        for mbti in top_mbti:
            idx = self.mbti_list.index(mbti)
            score = torch.FloatTensor(post_raw_reward[idx])
            score = rearrange(score, 'b t -> t b')

            # calculate rank according score
            if rank_list is None:
                rank_list = [rankdata(s.tolist()) for s in score]
            else:
                rank_list = [r + rankdata(s.tolist()) for r, s in zip(rank_list, score)]

        # find the post index with the highest rank in different dimension of mbti
        rank_list = einsum('... j i, ... j -> ... i j', torch.LongTensor(rank_list), torch.FloatTensor(diff_index))
        rank_list = rank_list.max(1).values.numpy()
        rank_index = np.argsort(rank_list).tolist()
        chosen_index = rank_index.pop()
        return post_list[chosen_index]


class FakeRewardModel:

    def __init__(self):
        self.mbti_list = [
            'INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP',
            'ISFP', 'ESTP', 'ESFP'
        ]

    def init_table(self, post_list: List[str]) -> Tuple[Dict[str, float], List[float], List[float]]:
        type_table = {k: 0.5 for k in self.mbti_list}
        return type_table, 0, 0

    def update_table(self, new_post: str, type_table: Dict[str, float]):
        return type_table

    def select_post(self, post_list: List[str], post_raw_reward: List[str], top_mbti: List[str]) -> str:
        return post_list[0]
