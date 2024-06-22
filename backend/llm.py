from typing import List, Tuple
from openai import OpenAI
import os
import tiktoken


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
