This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Aims
To test the capabilities of using AI tools for web development as of December 2022. The current available tools in use for this project are:

- Dalle mini for all images
- https://chat.openai.com/chat/ for all text, coding, idea generation, styling
- Github co-pilot for additional autocomplete

The quality and feel of this website will come down to the quality of the AI tools used. And my ability to clearly describe my aims to openais chat. The goal is to understand Ai's capabilities and limitations. And to see if it can be used to create a website.

Even the majority of this readme was written by Github copilot. I have only edited the text to make it more readable. code was edited to work in cases where context was lost during openai's chat.

There is a lot to be said about the potential automation of web development. I am excited to see what can be achieved. And discover what the limitations are.

## Caveats
It is very likely that openais chatbot does not follow best standards or even good practices. This is not a concern for this project. 

## Problems
- Often openais chat would get stuck answering a question and would not complete the answer, resulting in many retries
- It was able to suggest to build a chatroom, but unable to produce working code for it. I ended up using https://codesandbox.io/s/piffv?file=/package.json:697-707 as a guide