from typing import List, Tuple
from openai import OpenAI
import os
import tiktoken


def web_search(query: str) -> str:
    return "这是一个虚拟的搜索结果"


class LLMAPI:

    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("API_KEY"), base_url=os.getenv("API_URL"))
        # self.encoding = tiktoken.encoding_for_model(os.environ["MODEL_NAME"])

    def call(self, messages: List[str]) -> Tuple[str, int]:
        # token_count = sum([len(self.encoding.encode(message)) for message in messages])
        token_count = 0
        response = self.client.chat.completions.create(
            model=os.environ["MODEL_NAME"],
            messages=messages,
            max_tokens=4096,
            response_format={"type": 'json_object'},
            temperature=0.7,
            top_p=0.95,
            frequency_penalty=0,
            presence_penalty=0,
            stop=None,
        )
        content = response.choices[0].message.content.strip()
        return content, token_count


class ReActLLMAPI(LLMAPI):
    react_prompt_template = """你是一个可以调用外部工具的助手，可以使用的工具包括：
        {tool_description}
        互联网搜索引擎（Search）：使用多种中文互联网搜索引擎查找信息，用于获取任何你不知道的词汇/特定概念的信息，从而基于查询到的信息提升回答效果。
        如果使用工具请遵循以下格式回复：
        ```
        思路（Thought）：思考你当前步骤需要解决什么问题，是否需要使用工具
        工具（Action）：计划使用的工具名称，你的工具必须从 [Search, ] 中选择
        工具输入（Action Input）：工具输入参数
        ```
        工具返回按照以下格式回复：
        ```
        响应结果（Response）：调用工具后的结果
        ```
        如果你已经知道了答案，或者你不需要工具，请遵循以下格式回复
        ```
        思路（Thought）：给出最终答案的思考过程
        结果（Finish）：最终答案
        ```
        开始!
    """
    max_turns_prompt_template = """你需要基于历史消息整合返回一个最终答案"""

    def __init__(self, max_turns: int, **kwargs):
        super().__init__(**kwargs)
        self.max_turns = max_turns

    def call(self, messages: List[str]) -> Tuple[str, int]:
        token_count = 0
        for turn in range(self.max_turns):
            messages = self._format_messages(messages)
            content, token_count_per_turn = super().call(messages)
            token_count += token_count_per_turn
            thought, action, action_input, finish = self._parse_content(content)
            if finish:
                return finish, token_count

            action_output = self._execute_action(action, action_input)
            messages = self._parse_action_output(messages, action_output)

        messages = self._format_messages_max_turns(messages)
        content, token_count_per_turn = super().call(messages)
        token_count += token_count_per_turn
        return content, token_count

    def _format_messages(self, messages: List[str]) -> str:
        new_messages = []
        new_messages.append(dict(role="system", content=self.react_prompt_template))
        new_messages += messages
        return new_messages

    def _format_messages_max_turns(self, messages: List[str]) -> str:
        new_messages = messages
        new_messages.append(dict(role="system", content=self.max_turns_prompt_template))
        return new_messages

    def _parse_content(self, content: str) -> Tuple[str, str, str, str]:
        lines = content.split("\n")
        thought = ""
        action = ""
        action_input = ""
        finish = ""
        print('\ncontent:', content)
        for line in lines:
            if line.startswith("思路（Thought）："):
                thought = line.split("：", 1)[1]
            elif line.startswith("工具（Action）："):
                action = line.split("：", 1)[1]
            elif line.startswith("工具输入（Action Input）："):
                action_input = line.split("：", 1)[1]
            elif line.startswith("结果（Finish）："):
                finish = line.split("：", 1)[1]
        return thought, action, action_input, finish

    def _parse_action_output(self, messages: List[str], action_output: str) -> List[str]:
        new_messages = messages
        new_messages.append(dict(role="system", content=f"调用工具的响应结果（Response）：{action_output}\n请你结合这个结果继续对话\n"))
        return new_messages

    def _execute_action(self, action: str, action_input: str) -> str:
        if action == "Search":
            return web_search(action_input)
        else:
            raise RuntimeError("不支持的工具")


if __name__ == "__main__":
    llm = LLMAPI()
    print(llm.call([{"role": "user", "content": "你能跟我讲讲零元购吗"}])[0])
    react_llm = ReActLLMAPI(max_turns=3)
    print(react_llm.call([{"role": "user", "content": "你能跟我讲讲零元购吗"}])[0])
