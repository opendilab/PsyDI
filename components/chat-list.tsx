import { type Message } from 'ai'

import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chat-message'

export interface ChatList {
  messages: Message[]
}

function deepCopy(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  let copy: any;

  if (Array.isArray(obj)) {
    copy = [];
    for (let i = 0; i < obj.length; i++) {
      copy[i] = deepCopy(obj[i]);
    }
  } else {
    copy = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = deepCopy(obj[key]);
      }
    }
  }

  return copy;
}

const lang = process.env.LANG || 'zh' // default to zh
var texts = {
  userPostsAnswer: "",
  explorationPhaseTitle: "",
  mbtiOptionAnswer: "",
  blobTreeAnswer: "",
  discoveryPhaseTitle: ""
}
if (lang === 'zh') {
  texts.userPostsAnswer = "好的，感谢您真诚的分享。这能够帮助我对您有初步的了解。接下来，让我们通过几个有趣的问题，进一步探索您的独特倾向。"
  texts.explorationPhaseTitle = "『探索篇章』"
  texts.mbtiOptionAnswer = "您和过去的大师产生了共鸣！"
  texts.blobTreeAnswer = "原来如此！经过刚才的互动，我已对您有了一定了解啦。接下来的问题会更深入，希望您放松心情，选择与您最相近的选项。"
  texts.discoveryPhaseTitle = "『发现篇章』"
} else if (lang === 'en') {
  texts.userPostsAnswer = "Thanks for your sharing. It helps me to know you better. Now, let's explore your unique personality through some interesting questions."
  texts.explorationPhaseTitle = "[Exploration Phase]"
  texts.mbtiOptionAnswer = "You resonate with the master!"
  texts.blobTreeAnswer = "I see! After our interaction, I have a better understanding of you. The following questions will be more in-depth. Please relax and choose the option that is closest to you."
  texts.discoveryPhaseTitle = "[Discovery Phase]"
}

export function ChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null
  }
  const chatID = messages[0].id;
  var modifiedMessages = deepCopy(messages);
  if (messages.length >= 3) {  // start phase + ask for user posts + user posts
    modifiedMessages.splice(3, 0, {id: chatID, content: texts.userPostsAnswer, role: "assistant"}); // insert assistant message
    modifiedMessages.splice(4, 0, {id: chatID, content: texts.explorationPhaseTitle, role: "system"}); // insert system message
  }
  if (messages.length >= 5) {  // start phase + ask for user posts + user posts + mbti option + mbti option answer
    modifiedMessages.splice(7, 0, {id: chatID, content: texts.mbtiOptionAnswer, role: "assistant"}); // insert assistant message
  }
  if (messages.length >= 7) {  // start phase + ask for user posts + user posts + mbti option + mbti option answer + blob tree + blob tree answer
    modifiedMessages.splice(10, 0, {id: chatID, content: texts.blobTreeAnswer, role: "assistant"}); // insert assistant message
    modifiedMessages.splice(11, 0, {id: chatID, content: texts.discoveryPhaseTitle, role: "system"}); // insert system message
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {modifiedMessages.map((message: Message, index: number) => (
        <div key={index}>
          <ChatMessage message={message} />
          {index < messages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
    </div>
  )
}
