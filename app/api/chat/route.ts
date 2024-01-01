import { kv } from '@vercel/kv'
import { StreamingTextResponse } from 'ai'
import { HttpResponse, http } from 'msw';
import { translate } from '@vitalets/google-translate-api';

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'
import { getPsyDIAgent } from '@/app/psydi'


const lang = process.env.LANG || 'zh' // default to zh
const streamFlag = process.env.STREAM_FLAG == 'true' || false
var texts = {
  userPostsResponse: "",
  userPostsExamples: [] as string[], 
  explorationPhaseResponse: "",
  mbtiOptionResponse: "",
  philosophyResponse: "",
  philosophyAnswers: "",
  blobTreeResponse: "",
};
if (lang === 'zh') {
    texts.userPostsResponse = "现在，让我们从日常生活聊起。最近有什么趣事吗？您的想法和感受是？在您输入一段想法后请点击提交。（多条动态之间以中文分号或换行分隔）\n以下是一些仅供参考的例子：\n"
    texts.userPostsExamples = [
      "- *我喜欢与不同的人聊天，分享我的经历。我也喜欢听他们的家庭故事。与人交谈让我感到与社会接轨。*",
      "- *在很多时候，我能够在一些实证性的工作中做得很好，比如成为一名医生或高中教师。起初我可能得不到很高的评分，但随着经验的增长，我变得越来越自信。熟悉和规律的工作帮助我发现了我的才能。*",
      "- *小时候，我是一个饱读书籍和常常天马行空地想象的孩子。*",
      "- *没有什么有趣的事情，或者说，一切事物都有趣味的一面。*",
    ]
    texts.mbtiOptionResponse = "首先，我很好奇您对于视觉艺术的喜好。请在以下九张图片中选择您最喜欢的一张，并告诉我您选择的编号。" 
    texts.philosophyResponse = "著名的“电车难题”是一个富有争议的话题。我很想听听您的想法，请选择一项最符合的，或直接告诉我您的见解。"
    texts.philosophyAnswers = "(A) 什么也不做，让列车按照正常路线碾压过这五个人。\n(B) 拉下操纵杆，改变为另一条轨道，使列车压过另一条轨道上的那个人。\n(C) 冲向轨道用肉身拦住电车救下六个人。\n(D) 什么都不做，因为没有任何一种选择本质上是好的还是坏的。"
    texts.blobTreeResponse = "然后，请在以下图片中选择一个让您感到最舒适安心的场景，并告知我对应的编号。"
} else if (lang === 'en') {
    texts.userPostsResponse = "Now, let's start with your daily life. What's new? What are your thoughts and feelings? Please submit your thoughts after you type them in (separate multiple posts with a semicolon or new line).\nHere are some examples for your reference:\n"
    texts.userPostsExamples = [
        "- *I like to talk to different people and share my experiences. I also like to hear their family stories. Talking to people makes me feel connected to society.*",
        "- *In many cases, I can do well in some empirical work, such as being a doctor or a high school teacher. At first I may not get a high score, but as I gain experience, I become more and more confident. Familiar and regular work helps me discover my talents.*",
        "- *When I was a child, I was a child who read a lot of books and often imagined wildly.*",
        "- *There is nothing interesting, or rather, everything has an interesting side.*",
    ];
    texts.mbtiOptionResponse = "First, I am curious about your preferences for visual arts. Please choose your favorite one from the following nine pictures and tell me the number you choose."
    texts.philosophyResponse = "The famous 'trolley problem' is a controversial topic. I would like to hear your thoughts. Please choose the one that best suits you, or tell me your thoughts directly."
    texts.philosophyAnswers = "(A) Do nothing and let the train run over the five people on the normal route. (B) Pull the lever and change to another track, so that the train runs over the person on the other track. (C) Rush to the track and stop the train with your body to save the six people. (D) Do nothing, because no choice is inherently good or bad."
    texts.blobTreeResponse = "Then, please choose a scene from the following pictures that makes you feel most comfortable and tell me the corresponding number."
}


export const runtime = 'nodejs'
export const maxDuration = 300
const encoder = new TextEncoder();
const phase2StartTurnCount = 1
const phase3StartTurnCount = 5

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

  await agent.registerUser(userId, messages.length <= 1)

  const turnCount = await agent.getTurnCount(userId)
  let streamDelay = 80
  if (turnCount >= phase3StartTurnCount) {
    streamDelay = 50
  }
  const debug = process.env.DEBUG

  const startTime: Date = new Date();
  var done = false;
  var errorCode = 0;
  let response_string = ''

  // post info
  if (!(debug === 'true') && (turnCount === phase2StartTurnCount)) {
    const messagesUser = messages.filter((message: {[key: string]: string}) => message.role === 'user' && message.content !== 'start')
    await agent.postPosts({
      uid: userId,
      turnCount: turnCount,
      messages: messagesUser,
    })
  }

  // get next question
  if (turnCount === 0) {
    response_string = texts.userPostsResponse + texts.userPostsExamples.join('\n')
  } else if (turnCount === (phase2StartTurnCount)) {
    response_string = texts.mbtiOptionResponse
    response_string += `![alt text](${process.env.MBTI_OPTION_IMAGE_URL})`
    //await setTimeout(() => {}, 1500) // wait for async post user posts
  } else if (turnCount === (phase2StartTurnCount + 1)) {
    response_string = texts.blobTreeResponse
    response_string += `![alt text](${process.env.BLOB_TREE_IMAGE_URL})`
    //await setTimeout(() => {}, 1500) // wait for async post user posts
  } else {
    if (debug === 'true') {
      response_string = `hello world\n`
      done = true
    } else { 
        const messagesUser = messages.filter((message: {[key: string]: string}) => message.role === 'user' && message.content !== 'start')
        try {
            const response = await agent.getQuestions({
                uid: userId,
                turnCount: turnCount,
                messages: messagesUser,
            })
            done = response.done
            response_string = response.response_string
        } catch {
          errorCode = -1
        }
    }
  }
  const endTime: Date = new Date();
  const elapsedTime: number = endTime.getTime() - startTime.getTime();
  console.info(response_string, `Total elapsed time: ${elapsedTime}ms`)

  var finalText = response_string.replace(/\n/g, "\n\n");
  if (errorCode === 0 && turnCount > (phase2StartTurnCount + 1)) {
    if (lang === 'zh') {
        try {
            const idx = finalText.indexOf("![final img")
            if (idx !== -1) {
                var { text } = await translate(finalText.substring(0, idx), {from: 'en', to: 'zh-CN'});
                finalText = text + finalText.substring(idx)
            } else {
                var { text } = await translate(finalText, {from: 'en', to: 'zh-CN'});
                finalText = text
            }
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
        }, streamDelay);
      } else {
           controller.enqueue(encoder.encode(finalText))
           controller.close()
      }
    },
  });
  await agent.setTurnCount(userId, turnCount + 1)
  console.info(`[${userId}]return done`, done, turnCount)

  return new StreamingTextResponse(dataStream, {
    headers: { 'CHAT-DONE': done.toString(), 'CHAT-ERRORCODE': errorCode.toString()},
  });
}
