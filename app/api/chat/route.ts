import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse, experimental_StreamData } from 'ai'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'
import { PsyDI } from '@/lib/psydi'

export const runtime = 'edge'
const fireworks = new PsyDI('https://opendilabcommunity-psydi.hf.space/')


import { Configuration, OpenAIApi } from 'openai-edge'
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)
const userCountDict = {}

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

  // Request the Fireworks API for the response based on the prompt
  const turnCount = userCountDict[userId]
  let messages_user = messages.filter((message) => message.role === 'user')
  const response = await fireworks.create({
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


  let messages_tmp = [messages_user[turnCount]]
  messages_tmp[0].content = `repeat the following content strictly without any modification: ${response_string}`
  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages_tmp,
    temperature: 0.1,
    stream: true,
  })
  // const data = new experimental_StreamData();

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
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
        messages,
      }
      //await kv.hmset(`chat:${id}`, payload)
      //await kv.zadd(`user:chat:${userId}`, {
      //  score: createdAt,
      //  member: `chat:${id}`
      //})
    },
    //onFinal(completion) {
    //  data.close();
    //},
    //experimental_streamData: true,
  })

  //return new StreamingTextResponse(stream, {}, data)
  return new StreamingTextResponse(stream)
}
