# PsyDI
English | 简体中文
<div align="center">
    <img width="1000px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/banner.png"></a>
</div>

PsyDI is a multi-modal and interactive chatbot for psychological assessments. Its objective is to explore users' potential cognitive styles through interactive analysis of their multimodal inputs, finally determining their Myers-Briggs Type Indicator (MBTI). Additionally, PsyDI offers feedback in the form of customized figures and detailed analysis for each user. We are continuously improving PsyDI, with upcoming features such as an MBTI gallery. Your feedback is valuable to us!

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
