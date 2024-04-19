# PsyDI
English | 简体中文
<div align="center">
    <img width="1000px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/banner.png"></a>
</div>

PsyDI is a multi-modal and interactive chatbot for psychological assessments. Its objective is to explore users' potential cognitive styles through interactive analysis of their multimodal inputs, finally determining their Myers-Briggs Type Indicator (MBTI). Additionally, PsyDI offers feedback in the form of customized figures and detailed analysis for each user. We are continuously improving PsyDI, with upcoming features such as an MBTI gallery. Your feedback is valuable to us!

## :boom: News!

- We've recently refreshed our collection of classical character galleries:

    - [Yor Forger (SPY×FAMILY)](http://xhslink.com/13YTRE)

    - [Anya Forger (SPY×FAMILY)](http://xhslink.com/Z929fF)

    - [Jinx (League of Legends)](http://xhslink.com/Bpt45F)

| Character                  | Figure | MuZero | EfficientZero | Sampled EfficientZero | Gumbel MuZero | Stochastic MuZero | 
|----------------------------| -------- | ------ |-------------| ------------------ | ---------- |----------------|
| [Yor Forger (SPY×FAMILY)](http://xhslink.com/13YTRE)    | <img width="auto" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/yor.png"></a>     |
| [Anya Forger (SPY×FAMILY)](http://xhslink.com/Z929fF)        | <img width="auto" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/anya.png"></a>      |
| [Jinx (League of Legends)](http://xhslink.com/Bpt45F)      | <img width="auto" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/jinx.png"></a>      |
| Viktor (League of Legends)          | TODO |


## :star_struck: Quick Start

Getting started with PsyDI is easy! Follow these simple steps to begin your journey of self-discovery:

:rocket: **Accessing PsyDI Online:** Visit our [[website](https://psydi.opendilab.org.cn/)] to access PsyDI directly online. No downloads or installations required!

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

## :books: Introduction

<div align="center">
    <img width="1000px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/psydi_pipeline.jpg"></a>
</div>
PsyDI operates on the principle that understanding a user's expressed thoughts involves delving deeper into the underlying cognitive processes. By uncovering these cognitive processes, PsyDI can identify the user's commonly used cognitive styles and ultimately determine their Myers-Briggs Type Indicator (MBTI).

### Evaluation Framework

At the core of PsyDI's evaluation process is the table of MBTI scores, following established psychological testing methods. Each row of this table represents the probability of the current user being assigned to a specific MBTI type, ranging from 0 to 100.

### Process Description

PsyDI first converts the user's multimodal information into text form. The score model then evaluates these textual expressions, providing probabilities for each sentence being associated with any MBTI type. PsyDI iterates through the following three steps until determining the user's MBTI:

1. **Dynamic Selection:**
    PsyDI selects the post with the highest scores under both of the two MBTI types with the Top-2 probabilities. This step aims to pinpoint the most ambiguous information and prompt further questions to clarify.

2. **Dialog Interaction:**
    PsyDI engages the user in multiple rounds of dialog, utilizing three interaction formats: multiple choice, forced choice, and free question and answer. All the question and answer pairs are integrated into a new post.

3. **Table Update:**
    PsyDI updates the MBTI score table with the new post, incorporating the insights gained from the dialog interaction.

### Iterative Refinement

PsyDI iterates through these steps until it reaches a confident determination of the user's MBTI, continually refining its understanding through each interaction.

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Next.js AI Chatbot. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various OpenAI and authentication provider accounts.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm dev --port 3001
```

Your app template should now be running on [localhost:3001](http://localhost:3001/).

## Acnowledgements

- [vercel/ai-chatbot](https://github.com/vercel/ai-chatbot)

## License

PsyDI is released under the Apache 2.0 license.
