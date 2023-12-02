import { kv } from '@vercel/kv'
import { StreamingTextResponse } from 'ai'
import { HttpResponse, http } from 'msw';

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
  const response_string = response.response_string
  const endTime: Date = new Date();
  const elapsedTime: number = endTime.getTime() - startTime.getTime();
  console.log(response_string, `Total elapsed time: ${elapsedTime}ms`)

  const response_string_with_newline = response_string.replace(/\n/g, "\n\n")
  const dataStream = new ReadableStream({
    start(controller) {
        controller.enqueue(encoder.encode(response_string_with_newline));
        controller.close();
    },
  });
  return new StreamingTextResponse(dataStream);
}
