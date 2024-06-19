# PsyDI Mini Pipeline

## Installation
```shell
pip3 install -r requirements.txt
```

## Usage
Mini Pipeline with Our Released Reward Model
```shell
REWARD_MODEL_PATH=<rm-path> API_KEY=<your-api-key> API_URL=https://api.deepseek.com MODEL_NAME=deepseek-chat python3 psydi_mini_agent.py
```

Mini Pipeline with Fake Debug Reward Model
```shell
DEBUG=true API_KEY=<your-api-key> API_URL=https://api.deepseek.com MODEL_NAME=deepseek-chat python3 psydi_mini_agent.py
```


