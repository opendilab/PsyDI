import { kv } from '@vercel/kv'
import { StreamingTextResponse } from 'ai'
import { HttpResponse, http } from 'msw';
import { translate } from '@vitalets/google-translate-api';

import { nanoid } from '@/lib/utils'
import { getPsyDIAgent } from '@/app/psydi'
import { baiduTranslate } from '@/app/baidu_translate'


const lang = process.env.NEXT_PUBLIC_PSYDI_LANG || 'zh' // default to zh
const streamFlag = process.env.STREAM_FLAG == 'true' || false


export const runtime = 'nodejs'
export const maxDuration = 300
const encoder = new TextEncoder();

export async function POST(req: Request) {
  const agent = getPsyDIAgent()
  const json = await req.json()
  const { messages, _ } = json


  const [userId, turnCountAgent] = await agent.registerUser(messages.length <= 1)

  const messagesUser = messages.filter((message: {[key: string]: string}) => message.role === 'user' && !message.content.startsWith('start---'))
  const turnCountMessage = messagesUser.length
  if (turnCountAgent !== turnCountMessage) {  // reanswer case
    console.log('back to last question', userId, turnCountMessage, turnCountAgent)
    await agent.returnLastQuestion(userId)
    await agent.setTurnCount(userId, turnCountMessage)
  }
  const turnCount = turnCountMessage
  const debug = process.env.DEBUG

  const startTime: Date = new Date();
  var done = false;
  var errorCode = 0;
  let response_string = ''
  let table = null

  // get next question
  if (debug === 'true') {
    response_string = `hello world\n`
    done = true
  } else { 
    try {
      const messagesUserStart = messages.filter((message: {[key: string]: string}) => message.role === 'user' && message.content.startsWith('start---'))
      const startInfo = messagesUserStart[0].content
      const response = await agent.getQuestions({
        uid: userId,
        turnCount: turnCount,
        messages: messagesUser,
        startInfo: startInfo,
      })
      done = response.done
      response_string = response.response_string
      if (done) {
        table = response.result_extras.table
      }
    } catch (error) {
      //errorCode = -1
      console.error(`[${userId}]get question internal error: ${error}`)
    }
  }
  const endTime: Date = new Date();
  const elapsedTime: number = endTime.getTime() - startTime.getTime();
  console.info(response_string, `Total elapsed time: ${elapsedTime}ms`)


  var finalText = response_string.replace(/\n/g, "\n\n");
  if (errorCode === 0 && turnCount > (agent.phase2StartTurnCount + 1)) {
    if (false && lang === 'zh') {
        try {
            const idx = finalText.indexOf("![final img")
            if (idx !== -1) {
                //var { text } = await translate(finalText.substring(0, idx), {from: 'en', to: 'zh-CN'});
                var text = await baiduTranslate(finalText.substring(0, idx), 'en', 'zh')
                finalText = text + finalText.substring(idx)
            } else {
                //var { text } = await translate(finalText, {from: 'en', to: 'zh-CN'});
                var text = await baiduTranslate(finalText, 'en', 'zh')
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
  let streamDelay = 60
  if (turnCount >= agent.phase3StartTurnCount - 2) {
    streamDelay = 25
  }
  if (done) {
    streamDelay = 10
  }
  if (lang == 'en') {
    streamDelay /= 3
  }

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
                    const newIndex = finalText.indexOf(')', index);
                    controller.enqueue(encoder.encode(finalText.slice(index, newIndex + 1)));
                    index = newIndex + 1;
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

  if ((debug !== 'true') && done) {
    return new StreamingTextResponse(dataStream, {
      headers: { 'CHAT-DONE': done.toString(), 'CHAT-ERRORCODE': errorCode.toString(), 'TABLE': JSON.stringify(table)},
    });
  } else {
    return new StreamingTextResponse(dataStream, {
      headers: { 'CHAT-DONE': done.toString(), 'CHAT-ERRORCODE': errorCode.toString(), 'TABLE': 'null'},
    });
  }
}
