# PsyDI
<div align="center">
    <img width="1000px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/banner.png"></a>
</div>

English | [简体中文(Simplified Chinese)](https://github.com/opendilab/PsyDI/blob/main/README.zh.md) | [🔥PsyDI Paper](https://arxiv.org/abs/2408.03337)

## Introduction to PsyDI

PsyDI is a multi-modal and interactive chatbot for psychological assessments. Its objective is to explore users' potential cognitive styles through interactive analysis of their multimodal inputs, finally determining their Myers-Briggs Type Indicator (MBTI). Additionally, PsyDI offers feedback in the form of customized figures and detailed analysis for each user. We are continuously improving PsyDI, with upcoming features such as an MBTI gallery. Your feedback is valuable to us!

PsyDI can now be accessed directly via our [web link](https://psydi.opendilab.org.cn/).

## :boom: News!

- We've recently refreshed our collection of classical character galleries:

| Character                  | Introduction                | MBTI   | Figure |
|----------------------------| --------------------------- | ------ | ------ |
| [Yor Forger (SPY×FAMILY)](http://xhslink.com/13YTRE) | Yor Forger is a skilled assassin with a gentle heart, who disguises herself as a government official and becomes an integral part of the makeshift family in the "SPY×FAMILY" series. | ISFJ   | <img width="120px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/yor.png"></a>     |
| [Anya Forger (SPY×FAMILY)](http://xhslink.com/Z929fF) | Anya Forger is a telepathic schoolgirl with a mischievous streak, who unknowingly plays a pivotal role in her adoptive family's covert activities in the "SPY×FAMILY" narrative. |ENFP       | <img width="120px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/anya.png"></a>      |
| [Jinx (League of Legends)](http://xhslink.com/Bpt45F) | Jinx is an anarchic and explosively playful marksman in "League of Legends," known for her chaotic streak and dual-wielding firearms that unleash a hailstorm of chaos on the battlefield. |ESFP     |  <img width="120px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/jinx.png"></a>      |
| [Viktor (League of Legends)](http://xhslink.com/4VaTbH) | Victor is a brilliant and relentless inventor in "League of Legends," who wields his advanced Hex Core technology to manipulate the battlefield and eradicate his enemies with a blend of strategic disintegration and relentless augmentation. | INTJ   | <img width="120px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/viktor.png"></a>      |
| [Phoebe Buffay (Friends)](http://xhslink.com/e6wRII) | Phoebe Buffay is a charming character in "Friends", known for her quirky, humorous, and unconventional personality, along with a range of unique life experiences and perspectives. Phoebe was once a street performer, crafting songs filled with personal flair and humor. Her relationship with her biological father, her love for animals, and her support and care for her friends all add much joy and vibrancy to the show. | ENFP   | <img width="120px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/phoebe.png"></a>      |
| [Twilight (SPY×FAMILY)](http://xhslink.com/WydWHL) | Twilight (Loid Forger) is the top spy from the West Country. In order to carry out his espionage mission, he temporarily formed a family and adopted Anya, who was originally an orphan. As time goes by, Loid, who was originally focused on the mission, began to genuinely care about the temporary family and started to seriously consider how to permanently settle them after the mission and conceal the secret that he is a spy. | INTJ   | <img width="120px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/loid.png"></a>      |
| [Chandler (Friends)](http://xhslink.com/A6N6lM) | Chandler Bing is a character from "Friends". He is Ross's college roommate, known for his humorous and witty remarks, often making fun of himself to entertain others. He develops a romantic relationship with Monica and eventually marries her. Known for his wit and humor, Chandler is the comic relief of the series. | ENTP   | <img width="120px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/chandler.png"></a>      |
| [An Lingrong (Empresses in the Palace)](http://xhslink.com/Q5aN5M) | Originally a friend of Zhen Huan, An Lingrong grows jealous and schemes against her due to family pressure to win the Yongzheng Emperor's favor and manipulation by other imperial consorts. | ISFJ   | <img width="120px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/anlingrong.PNG"></a>      |
| [Emperor and Empress (Empresses in the Palace)](http://xhslink.com/8yglPN) | In the setting of the TV drama "The Legend of Zhen Huan," Emperor Yongzheng and the Empress were a young married couple, having tied the knot when Yongzheng was still the Prince of Yong. However, as time passed, their relationship became complex and tortuous. | ESTJ/ISTJ   | <img width="120px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/emperor.png"></a>      |
| [Rafayel (Love and deepspace)](http://xhslink.com/etQHwQ) | Rafayel is one of the character in "Love and Deep Space," hailing from the oceanic civilization of Lemuria. He is a unique and gifted artist, embodying innocence and deep affection. Although he may appear stubborn and somewhat unapproachable at times, his heart is filled with a strong sense of responsibility and a profound regard for emotions. | INFP   | <img width="120px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/qiyu.png"></a>      |
| [Xavier (Love and deepspace)](http://xhslink.com/0l2HwQ) | Xavier is one of the male protagonists in "Love and Deep Space," currently serving as a deep space hunter for the Hunter Association. He exhibits extraordinary patience and a detached, Buddhist-like attitude towards life, interacting with the world in a gentle and peaceful manner while maintaining a moderate distance in interpersonal relationships. | ISTP   | <img width="120px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/shenxinghui.png"></a>      |


## Outline

- [Introduction to PsyDI](#introduction-to-psydi)
- [News](#boom-news)
- [Outline](#outline)
- [Quick Start](#star_struck-quick-start)
- [PsyDI Mini Pipeline](#key-psydi-mini-pipeline)
- [Introduction](#books-introduction)
  - [Evaluation Framework](#evaluation-framework)
  - [Process Description](#process-description)
  - [Iterative Refinement](#iterative-refinement)
- [Evaluation](#bar_chart-evaluation)
- [Roadmap](#roadmap)
- [Running Frontend Locally](#running-frontend-locally)
- [Acnowledgements](#acnowledgements)
- [Feedback and Contribution](#feedback-and-contribution)
- [Citation](#citation)
- [License](#license)


## :star_struck: Quick Start

Getting started with PsyDI is easy! Follow these simple steps to begin your journey of self-discovery:

:rocket: **Accessing PsyDI Online:** Visit our [website](https://psydi.opendilab.org.cn/) to access PsyDI directly online. No downloads or installations required!

:memo: **Beginning the Quiz:**
   - Upon entering the quiz, you'll be prompted to choose a label that best represents you. This helps PsyDI tailor the assessment to your personality.
   - Next, you'll be asked to share one of your recent favorite songs and your most recent thoughts. This information provides valuable insights into your current mindset and preferences.

<div align="center">
    <img width="1000px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/init_part.png"></a>
</div>

:bulb: **Exploring Your Personality:**
   - In the Explore chapter, PsyDI will ask you a series of questions to gain a basic understanding of who you are based on your provided tags. This initial interaction sets the stage for deeper exploration.

:speech_balloon: **Interactive Chatting:**
   - PsyDI will chat with you to delve deeper into topics mentioned earlier. This interactive process typically consists of 12-15 questions, allowing PsyDI to get to know you better.

<div align="center">
    <img width="1000px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/choose_part.png"></a>
</div>

:sparkles: **Detailed Analysis:**
   - Finally, PsyDI will provide you with a comprehensive analysis of your Myers-Briggs Type Indicator (MBTI) and characteristics. This analysis offers valuable insights into your personality traits and tendencies.
   - Additionally, you'll receive a generated image that matches your temperament, adding a visual element to your understanding of yourself.

Now that you know the basics, dive in and start your journey with PsyDI today!

## :key: PsyDI Mini Pipeline

We offer a mini version of the PsyDI pipeline as a demo, making it accessible for everyone to use. This mini pipeline allows users to input several initial posts and generates an initial MBTI score table. It then selects posts with the highest likelihood of having deep meaning to initiate a multi-turn dialogue with the user. After the dialogue, the pipeline updates the user's MBTI score table. Such mini pipeline is the core module of PsyDI as mentioned in the [Introduction](#books-introduction).

In this mini pipeline, we apply [DeepSeek](https://www.deepseek.com/) as a large language model example to provide multi-turn dialogue. Users can also replace it with any other language model with multi-turn dialogue capabilities.

## Installation
```shell
pip3 install -r requirements.txt
```

## Usage
Mini Pipeline with Our [Released Score Model](https://huggingface.co/OpenDILabCommunity/PsyDI-RM-v0.1-zh)
```shell
REWARD_MODEL_PATH=<rm-path> API_KEY=<your-api-key> API_URL=https://api.deepseek.com MODEL_NAME=deepseek-chat python3 psydi_mini_agent.py
```

Mini Pipeline with Fake Debug Score Model
```shell
DEBUG=true API_KEY=<your-api-key> API_URL=https://api.deepseek.com MODEL_NAME=deepseek-chat python3 psydi_mini_agent.py
```

## :books: Introduction

<div align="center">
    <img width="1000px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/psydi_pipeline.png"></a>
</div>
PsyDI operates on the principle that understanding a user's expressed thoughts involves delving deeper into the underlying cognitive processes. By uncovering these cognitive processes, PsyDI can identify the user's commonly used cognitive styles and ultimately determine their Myers-Briggs Type Indicator (MBTI).

### Evaluation Framework

At the core of PsyDI's evaluation process is a table of MBTI scores, following established psychological testing methods. Each row of this table represents the probability of the current user being assigned to a specific MBTI type, ranging from 0 to 100.

### Process Description

PsyDI first converts the user's multimodal information into text form. The score model then evaluates these textual expressions, providing probabilities for each sentence being associated with any MBTI type. PsyDI iterates through the following three steps until determining the user's MBTI:

1. **Post Selection:**
    PsyDI selects the post with the highest scores under both of the two MBTI types with the Top-2 probabilities. This step aims to pinpoint the most ambiguous information and prompt further questions to clarify.

2. **Dialog Interaction:**
    PsyDI engages the user in multiple rounds of dialog, utilizing three interaction formats: multiple choice, forced choice, and free question and answer. All the question and answer pairs are integrated into a new post.

3. **Table Update:**
    PsyDI updates the MBTI score table with the new post, incorporating the insights gained from the dialog interaction.

### Iterative Refinement

PsyDI iterates through these steps until it reaches a confident determination of the user's MBTI, continually refining its understanding through each interaction.

## Evaluation

### Score Model Evaluation
We have constructed a pair-wise MBTI dataset and compared the performance of multiple closed-source and open-source models with PsyDI on this dataset. PsyDI has demonstrated superior results over existing language models across various MBTI datasets, as shown in the following:

<div align="center">
    <img width="1000px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/benchmark.png"></a>
</div>

### Pipeline Evaluation
We assessed the accuracy of the PsyDI Pipeline compared to existing MBTI tests in evaluating MBTI bots, with the results displayed on the left side of the figure below. Additionally, we evaluated the degree of dependence of the PsyDI Pipeline on initial dynamics and found that PsyDI can determine the user's true MBTI in subsequent conversations even under random initial dynamics, with the results shown on the right side of the figure:

<div align="center">
    <img width="1000px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/rank_random.png"></a>
</div>

## Roadmap
- [x] Online deployment of PsyDI
- [x] Release all the frontend code and deployment scripts
- [x] MBTI evaluation gallery
- [ ] Other language support (English/Korean/Japanese)
- [x] Release the backend code examples and prompts
- [ ] Release the generated datasets
- [x] Release the trained reward model
- [x] Technical report arxiv link
- [ ] More multi-modal and interactive questions and examples

## Running Frontend Locally

You will first need to use the environment variables [defined in `.env.example`](.env.example) to run PsyDI agent.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various OpenAI and authentication provider accounts.

Then you need to install node.js (v18.17.0 is recommended) and npm on your machine. 

After setting up all the prerequisites, you can run the following commands to start the frontend:
```bash
npm install -g pnpm
pnpm install
pnpm dev --port 3001
```

Your app template should now be running on [localhost:3001](http://localhost:3001/).

## Acnowledgements

- Thanks JAAAAACKKKKKY for her contributions to the UI/UX design and artistic materials for this project."
- [vercel/ai-chatbot](https://github.com/vercel/ai-chatbot)

## Feedback and Contribution

- [File an issue](https://github.com/opendilab/PsyDI/issues/new) on Github
- Discuss on PsyDI's WeChat group (i.e. add us on WeChat: ding314assist)

  <img src=https://github.com/opendilab/PsyDI/blob/main/assets/wechat.jpeg width=35% />
- Contact our email (opendilab@pjlab.org.cn)

We appreciate all the feedbacks and contributions to improve PsyDI, both algorithms and system designs.

## Citation

```latex
@article{li2024psydi,
    title={Psydi: A MBTI agent that helps you understand your personality type through a relaxed multi-modal interaction.},
    author={Li, Xueyan and Chen, Xinyan and Niu, Yazhe and Hu, Shuai and Liu, Yu},
    journal={arXiv preprint arXiv:2408.03337},
    year={2024}
}
```

## License

PsyDI is released under the Apache 2.0 license.
