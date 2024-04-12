# PsyDI

PsyDI: A MBTI agent that helps you understand your personality type through a relaxed multi-modal interaction.

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
