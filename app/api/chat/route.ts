import { kv } from '@vercel/kv'
import { StreamingTextResponse } from 'ai'
import { HttpResponse, http } from 'msw';
import { translate } from '@vitalets/google-translate-api';

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'
import { getPsyDIAgent } from '@/lib/psydi'


const lang = process.env.LANG || 'zh' // default to zh
var texts = {
  userPostsResponse: "",
  explorationPhaseResponse: "",
  mbtiOptionResponse: "",
  philosophyResponse: "",
  blobTreeResponse: "",
};
if (lang === 'zh') {
    texts.userPostsResponse = "现在，让我们从日常生活聊起。最近有什么趣事吗？您的想法和感受是？在您输入一段想法后请点击提交。（多条动态之间以换行分隔）"
    texts.mbtiOptionResponse = "**（第一题）** 首先，我很好奇您对于视觉艺术的喜好。请在以下九张图片中选择您最喜欢的一张，并告诉我您选择的编号。" 
    texts.philosophyResponse = "**（第二题）** 著名的“电车难题”是一个富有争议的话题。我很想听听您的想法，请选择一项最符合的，或直接告诉我您的见解。"
    texts.blobTreeResponse = "**（第三题）** 最后，请在以下图片中选择一个让您感到最舒适安心的场景，并告知我对应的编号。"
} else if (lang === 'en') {
    texts.userPostsResponse = "Now, let's start with your daily life. What's new? What are your thoughts and feelings? Please submit your thoughts after you type them in (separate multiple posts with a new line)."
    texts.mbtiOptionResponse = "**(Question 1)** First, I am curious about your preferences for visual arts. Please choose your favorite one from the following nine pictures and tell me the number you choose."
    texts.philosophyResponse = "**(Question 2)** The famous 'trolley problem' is a controversial topic. I would like to hear your thoughts. Please choose the one that best suits you, or tell me your thoughts directly."
    texts.blobTreeResponse = "**(Question 3)** Finally, please choose a scene from the following pictures that makes you feel most comfortable and tell me the corresponding number."
}

export const runtime = 'edge'
const encoder = new TextEncoder();

export async function POST(req: Request) {
  const agent = getPsyDIAgent()
  const json = await req.json()
  const { messages, _ } = json
  const user = (await auth())?.user
  const userId = user.id
  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }
  // remove old data
  try {
    const turnCount = agent.getTurnCount(userId)
    if (turnCount > 0 && messages.length <= 1) {
      agent.deleteUser(userId)
    }
  } catch (e) {
    // do nothing
  }

  agent.registerUser(userId)

  const turnCount = agent.getTurnCount(userId)
  const debug = process.env.DEBUG

  const startTime: Date = new Date();
  let response_string = ''
  if (turnCount === 0) {
    response_string = texts.userPostsResponse
  } else if (turnCount === 1) {
    response_string = texts.mbtiOptionResponse
    response_string += `![alt text](${process.env.MBTI_OPTION_IMAGE_URL})`
  } else if (turnCount === 2) {
    response_string = texts.blobTreeResponse
    response_string += `![alt text](${process.env.BLOB_TREE_IMAGE_URL})`
  } else {
    if (debug === 'true') {
      response_string = `hello world\n`
    } else { 
        let messages_user = messages.filter((message: {[key: string]: string}) => message.role === 'user')
        const response = await agent.create({
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

  var finalText = response_string.replace(/\n/g, "\n\n");
  if (turnCount > 2) {
    if (lang === 'zh') {
        try {
            var { text } = await translate(finalText, {from: 'en', to: 'zh-CN'});
            finalText = text
        } catch (e: any) {
            if (e.name === 'TooManyRequestsError' || e.name === 'ConnectTimeoutError') {
                console.log('Translate API is not available or rate limit exceeded, using original text')
            }
        }
    }
    if (debug === 'true') {
        finalText += `![alt text](${process.env.EXAMPLE_IMAGE_URL})`
    }
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
  //await kv.hmset(`chat:${id}`, payload)
  //await kv.zadd(`user:chat:${userId}`, {
  //      score: createdAt,
  //      member: `chat:${id}`
  //})

  const dataStream = new ReadableStream({
    start(controller) {
        controller.enqueue(encoder.encode(finalText));
        controller.close();
    },
  });
  agent.setTurnCount(userId, turnCount + 1)

  return new StreamingTextResponse(dataStream);
}
