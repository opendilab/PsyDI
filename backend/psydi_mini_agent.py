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
        # self.reward_model = RewardModel()
        self.reward_model = FakeRewardModel()

        with open(os.path.join(os.path.dirname(__file__), 'prompt.txt'), 'r', encoding='utf-8') as f:
            self.prompt = f.read()

        self.qa_prompt = "请将这段问答重新组织成受访者的自我描述。只需提供自我描述部分。"
        self.max_turn = 5

    def reset(self):
        self.table = None
        self.post_value_list = None
        self.history = []

        self.history.append({"role": "system", "content": self.prompt})
        self.history.append({"role": "assistant", "content": "你好！很高兴和你进行对话。请告诉我一个具体的问题或情境，我将通过分析来帮助你解决并了解你的思维认知方式。"})

    def get_question(self, answer: str):
        if self.table is None:
            logging.error("Please initialize the table first.")
            return

        self.history.append({"role": "user", "content": answer})

        print('before call', self.history)
        question, token_count = self.llm.call(self.history)
        self.history.append({"role": "assistant", "content": question})
        return question

    def init_table(self, post_list: List[str]):
        self.table, self.post_value_list, self.post_raw_reward = self.reward_model.init_table(post_list)
        logging.info(f"Table initialized: {self.table}")

    def choose_post_to_ask(self, posts: list):
        if self.table is None:
            logging.error("Please initialize the table first.")
            return

        post = posts[0]
        return post

    def update_table(self, question: str, answer: str):
        if self.table is None:
            logging.error("Please initialize the table first.")
            return

        logging.info(f"Table updated: {self.table}")

    def run(self, init_post_list: List[str]):
        self.init_table(init_post_list)
        print(f"MBTI 量表初始化完成，初始分为：{self.table}")

        answer = self.choose_post_to_ask(init_post_list)
        logging.info(f"Post to ask: {answer}")
        print(f"被选到的用户动态为：{answer}")

        count = 0

        while count < self.max_turn:
            question = self.get_question(answer)
            if re.search(r'自我描述[】:：\t\*]*\s*(.*?)(?=\.|$)', question):
                print(f'PsyDI Mini 问答完成\n{question}')
                break

            question_shown = f'\n\033[32m[Q{count}] \033[0m' + question + '\n' + f'\033[32m[A{count}]\033[0m 请输出选项或输入您自己的答案: '

            answer = input(question_shown)
            answer = answer.strip()
            count += 1

        self.table = self.update_table(question, answer)
        # print(f"\nMBTI 量表更新完成，更新后分为：{self.table}")


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
