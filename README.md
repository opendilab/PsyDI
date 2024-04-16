# PsyDI
English | 简体中文
<div align="center">
    <img width="1000px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/banner.png"></a>
</div>

PsyDI is a multi-modal and interactive chatbot for psychological assessments. Its objective is to explore users' potential cognitive styles through interactive analysis of their multimodal inputs, finally determining their Myers-Briggs Type Indicator (MBTI). Additionally, PsyDI offers feedback in the form of customized figures and detailed analysis for each user. We are continuously improving PsyDI, with upcoming features such as an MBTI gallery. Your feedback is valuable to us!

## :star_struck: Quick Start

Getting started with PsyDI is easy! Follow these simple steps to begin your journey of self-discovery:

1. **Accessing PsyDI Online:** Visit our [[website](https://psydi.opendilab.org.cn/)] to access PsyDI directly online. No downloads or installations required!

2. **Beginning the Quiz:**
   - Upon entering the quiz, you'll be prompted to choose a label that best represents you. This helps PsyDI tailor the assessment to your personality.
   - Next, you'll be asked to share one of your recent favorite songs and your most recent thoughts. This information provides valuable insights into your current mindset and preferences.

3. **Exploring Your Personality:**
   - In the Explore chapter, PsyDI will ask you a series of questions to gain a basic understanding of who you are based on your provided tags. This initial interaction sets the stage for deeper exploration.

4. **Interactive Chatting:**
   - PsyDI will chat with you to delve deeper into topics mentioned earlier. This interactive process typically consists of 12-15 questions, allowing PsyDI to get to know you better.

5. **Detailed Analysis:**
   - Finally, PsyDI will provide you with a comprehensive analysis of your Myers-Briggs Type Indicator (MBTI) and characteristics. This analysis offers valuable insights into your personality traits and tendencies.
   - Additionally, you'll receive a generator image that matches your temperament, adding a visual element to your understanding of yourself.

Now that you know the basics, dive in and start your journey with PsyDI today!

## Introduction

<div align="center">
    <img width="1000px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/psydi_pipeline.jpg"></a>
</div>



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
