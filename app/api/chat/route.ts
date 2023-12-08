import { kv } from '@vercel/kv'
import { StreamingTextResponse } from 'ai'
import { HttpResponse, http } from 'msw';
import { translate } from '@vitalets/google-translate-api';

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'
import { PsyDI } from '@/lib/psydi'


export const runtime = 'edge'
const server = new PsyDI('https://opendilabcommunity-psydi.hf.space/')
const encoder = new TextEncoder();

const userCountDict: {
  [key: string]: number;
} = {}

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, _ } = json
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  if (!(userId in userCountDict)) {
    userCountDict[userId] = 0
  } else {
    userCountDict[userId] += 1
  }

  const startTime: Date = new Date();
  const turnCount = userCountDict[userId]

  const debug = process.env.DEBUG
  let response_string = ''
  if (turnCount === 0) {
    response_string = '您好，我是您的 MBTI 测试助手，首先我将通过一系列趣味问题来构建您的概览形象，从而为您后续生成定制化的 MBTI 测试。\n**第一题：[Blob Tree]** 请在下方图片中选出最符合您心意的小人，并将序号填在回答栏中（1-20）。'
    response_string += `![alt text](${process.env.BLOB_TREE_IMAGE_URL})`
  } else {
    if (debug === 'true') {
      response_string = `hello world\n`
    } else { 
        let messages_user = messages.filter((message: {[key: string]: string}) => message.role === 'user')
        const response = await server.create({
            rawContent: messages_user[turnCount].content,
            uid: userId,
            turnCount: turnCount,
            stream: true,
            max_tokens: 1000,
            temperature: 0.75,
            top_p: 1,
        })
        const done = response.done
        response_string = response.response_string
    }
  }
  const endTime: Date = new Date();
  const elapsedTime: number = endTime.getTime() - startTime.getTime();
  console.log(response_string, `Total elapsed time: ${elapsedTime}ms`)

  const response_string_with_newline = response_string.replace(/\n/g, "\n\n");
  var finalText = '';
  try {
    var { text } = await translate(response_string_with_newline, {from: 'en', to: 'zh-CN'});
    finalText = text
  } catch (e: any) {
    if (e.name === 'TooManyRequestsError' || e.name === 'ConnectTimeoutError') {
        console.log('Translate API is not available or rate limit exceeded, using original text')
    }
  }
  if (debug === 'true' && turnCount > 0) {
    finalText += `![alt text](${process.env.EXAMPLE_IMAGE_URL})`
  }

  const title = json.messages[0].content.substring(0, 100)
  const id = json.id ?? nanoid()
  const createdAt = Date.now()
  const path = `/chat/${id}`
  const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        turnCount: turnCount,
        messages: messages,
        response: response_string,
  }
  // console.log(payload)
  await kv.hmset(`chat:${id}`, payload)
  await kv.zadd(`user:chat:${userId}`, {
        score: createdAt,
        member: `chat:${id}`
  })

  const dataStream = new ReadableStream({
    start(controller) {
        controller.enqueue(encoder.encode(text ? text : response_string_with_newline));
        controller.close();
    },
  });
  return new StreamingTextResponse(dataStream);
}
