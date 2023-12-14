import { kv } from '@vercel/kv'
import { StreamingTextResponse } from 'ai'
import { HttpResponse, http } from 'msw';
import { translate } from '@vitalets/google-translate-api';

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'
import { getPsyDIAgent } from '@/lib/psydi'


const lang = process.env.LANG || 'zh' // default to zh
const streamFlag = process.env.STREAM_FLAG || false
var texts = {
  userPostsResponse: "",
  explorationPhaseResponse: "",
  mbtiOptionResponse: "",
  philosophyResponse: "",
  philosophyAnswers: "",
  blobTreeResponse: "",
};
if (lang === 'zh') {
    texts.userPostsResponse = "现在，让我们从日常生活聊起。最近有什么趣事吗？您的想法和感受是？在您输入一段想法后请点击提交。（多条动态之间以换行分隔）"
    texts.mbtiOptionResponse = "首先，我很好奇您对于视觉艺术的喜好。请在以下九张图片中选择您最喜欢的一张，并告诉我您选择的编号。" 
    texts.philosophyResponse = "著名的“电车难题”是一个富有争议的话题。我很想听听您的想法，请选择一项最符合的，或直接告诉我您的见解。"
    texts.philosophyAnswers = "(A) 什么也不做，让列车按照正常路线碾压过这五个人。\n(B) 拉下操纵杆，改变为另一条轨道，使列车压过另一条轨道上的那个人。\n(C) 冲向轨道用肉身拦住电车救下六个人。\n(D) 什么都不做，因为没有任何一种选择本质上是好的还是坏的。"
    texts.blobTreeResponse = "最后，请在以下图片中选择一个让您感到最舒适安心的场景，并告知我对应的编号。"
} else if (lang === 'en') {
    texts.userPostsResponse = "Now, let's start with your daily life. What's new? What are your thoughts and feelings? Please submit your thoughts after you type them in (separate multiple posts with a new line)."
    texts.mbtiOptionResponse = "First, I am curious about your preferences for visual arts. Please choose your favorite one from the following nine pictures and tell me the number you choose."
    texts.philosophyResponse = "The famous 'trolley problem' is a controversial topic. I would like to hear your thoughts. Please choose the one that best suits you, or tell me your thoughts directly."
    texts.philosophyAnswers = "(A) 1. Do nothing and let the train run over the five people on the normal route. (B) Pull the lever and change to another track, so that the train runs over the person on the other track. (C) Rush to the track and stop the train with your body to save the six people. (D) Do nothing, because no choice is inherently good or bad."
    texts.blobTreeResponse = "Finally, please choose a scene from the following pictures that makes you feel most comfortable and tell me the corresponding number."
}

export const runtime = 'nodejs'
export const maxDuration = 300
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
    response_string = texts.philosophyResponse
    response_string += `![alt text](${process.env.PHILOSOPHY_IMAGE_URL})`
    response_string += texts.philosophyAnswers
  } else if (turnCount === 3) {
    response_string = texts.blobTreeResponse
    response_string += `![alt text](${process.env.BLOB_TREE_IMAGE_URL})`
  } else {
    if (debug === 'true') {
      response_string = `hello world\n`
    } else { 
        const messagesUser = messages.filter((message: {[key: string]: string}) => message.role === 'user' && message.content !== 'start')
        const response = await agent.getQuestions({
            uid: userId,
            turnCount: turnCount,
            messages: messagesUser,
        })
        const done = response.done
        response_string = response.response_string
    }
  }
  const endTime: Date = new Date();
  const elapsedTime: number = endTime.getTime() - startTime.getTime();
  console.info(response_string, `Total elapsed time: ${elapsedTime}ms`)

  var finalText = response_string.replace(/\n/g, "\n\n");
  if (turnCount > 3) {
    if (lang === 'zh') {
        try {
            var { text } = await translate(finalText, {from: 'en', to: 'zh-CN'});
            finalText = text
        } catch (e: any) {
            if (e.name === 'TooManyRequestsError' || e.name === 'ConnectTimeoutError') {
                console.error('Translate API is not available or rate limit exceeded, using original text')
            }
            console.error('Other translate error', e)
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
  // console.info(payload)
  //await kv.hmset(`chat:${id}`, payload)
  //await kv.zadd(`user:chat:${userId}`, {
  //      score: createdAt,
  //      member: `chat:${id}`
  //})

  const dataStream = new ReadableStream({
    start(controller) {
      if (streamFlag) {
        let index = 0;
        const timer = setInterval(() => {
            if (index === 0) {
                controller.enqueue(encoder.encode(finalText.slice(0, 5)));
                index = 5;
            } else if (index >= finalText.length) {
                clearInterval(timer);
                controller.close()
            } else {
                if (finalText[index] === '!' && finalText[index + 1] === '[') {
                    controller.enqueue(encoder.encode(finalText.slice(index)));
                    index = finalText.length;
                } else {
                    controller.enqueue(encoder.encode(finalText[index]));
                    index++;
                }
            }
        }, 80);
      } else {
           controller.enqueue(encoder.encode(finalText))
           controller.close()
      }
    },
  });
  agent.setTurnCount(userId, turnCount + 1)

  return new StreamingTextResponse(dataStream);
}
