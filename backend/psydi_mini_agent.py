from typing import List
import re
import os
from ditk import logging
from rich import print
from llm import LLMAPI
from reward_model_inference import RewardModel, FakeRewardModel


class PsyDIMiniAgent:

    def __init__(self):
        self.llm = LLMAPI()
        self.debug = os.getenv('DEBUG', 'false').lower() == 'true'
        if self.debug:
            # use a fake RM for debug
            self.reward_model = FakeRewardModel()
        else:
            self.reward_model = RewardModel()

        with open(os.path.join(os.path.dirname(__file__), 'prompt.txt'), 'r', encoding='utf-8') as f:
            self.prompt = f.read()

        self.max_turn = 5

    def reset(self):
        self.table = None
        self.post_raw_reward = None
        self.history = []

        self.history.append({"role": "system", "content": self.prompt})
        self.history.append({"role": "assistant", "content": "你好！很高兴和你进行对话。请告诉我一个具体的问题或情境，我将通过分析来帮助你解决并了解你的思维认知方式。"})

    def get_question(self, answer: str):
        if self.table is None:
            logging.error("Please initialize the table first.")
            return

        self.history.append({"role": "user", "content": answer})

        question, token_count = self.llm.call(self.history)
        self.history.append({"role": "assistant", "content": question})
        return question

    def init_table(self, post_list: List[str]):
        self.table, _, self.post_raw_reward = self.reward_model.init_table(post_list)
        logging.info(f"Table initialized: {self.table}")

    def print_table(self) -> str:
        return '\n'.join([f'{k}: {v:.2f}' for k, v in self.table.items()])

    def choose_post_to_ask(self, post_list: List[str]) -> str:
        if self.table is None:
            logging.error("Please initialize the table first.")
            return

        sorted_items = sorted(self.table.items(), key=lambda item: item[1], reverse=True)
        top_mbti = [item[0] for item in sorted_items[:2]]
        return self.reward_model.select_post(post_list, self.post_raw_reward, top_mbti)

    def update_table(self, new_post: str):
        if self.table is None:
            logging.error("Please initialize the table first.")
            return
        self.table = self.reward_model.update_table(new_post, self.table)

        logging.info(f"Table updated: {self.table}")

    def run(self, init_post_list: List[str]):
        self.init_table(init_post_list)
        print(f"MBTI 量表初始化完成，初始分为：\n{self.print_table()}")

        answer = self.choose_post_to_ask(init_post_list)
        logging.info(f"Post to ask: {answer}")
        print(f"被选到的用户动态为：{answer}")

        count = 0

        while count < self.max_turn:
            question = self.get_question(answer)
            if re.search(r'自我描述[】:：\t\*]*\s*(.*?)(?=\.|$)', question):
                print(f'\n\n## PsyDI Mini 问答完成\n\n{question}')
                break
            count += 1

            question_shown = f'\n\033[32m[Q{count}] \033[0m' + question + '\n' + f'\033[32m[A{count}]\033[0m 请输出选项或输入您自己的答案: '

            answer = input(question_shown)
            answer = answer.strip()

        self.update_table(question)
        print(f"\nMBTI 量表更新完成，更新后分为：\n{self.print_table()}")


if __name__ == "__main__":
    agent = PsyDIMiniAgent()
    agent.reset()
    agent.run(
        init_post_list=[
            '我喜欢与不同的人聊天，分享我的经历。我也喜欢听他们的故事。与人交谈让我能发现新乐趣。',
            '没有什么有趣的事情，或者说，任何事物都有趣味的一面。',
            '我喜欢和朋友聚在一起，聊天，开玩笑，分享快乐。',
        ]
    )
