'use client'

import { type Message } from 'ai'
import { useState } from 'react'
import { BeatLoader } from 'react-spinners'

import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chat-message'
import { GetThemeColor } from '@/components/theme-toggle'
import { FinalResult } from '@/components/final-result'

export interface ChatList {
  messages: Message[]
  chatDone: boolean
  table: Record<string, any> | null
  isLoading: boolean
  isMessageFinished: boolean
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

interface Texts {
  startPhaseTitle: string;
  userPostsAnswer: string; 
  explorationPhaseTitle1: string;
  explorationPhaseTitle2: string;
  mbtiOptionInfo: Record<string, any>;
  mbtiOptionAnswer: string;
  philosophyFixedAnswer: string; 
  philosophyFixedAnswerPart2: string; 
  philosophyFreeAnswer: string;
  philosophyRatio: string[];
  blobTreeAnswer: string;
  blobTreeOptionInfo: Record<string, any>;
  blobTreeOptionAnswer: string;
  discoveryPhaseTitle: string;
  endPhaseTitle: string;
  endDescription: string;
  startIntro: string;
  explorationIntro: string;
  discoveryIntro: string;
  endIntro: string;
}
var texts: Texts = {
  startPhaseTitle: "",
  userPostsAnswer: "",
  explorationPhaseTitle1: "",
  explorationPhaseTitle2: "",
  mbtiOptionInfo: {},
  mbtiOptionAnswer: "",
  philosophyFixedAnswer: "",
  philosophyFreeAnswer: "",
  philosophyFixedAnswerPart2: "",
  philosophyRatio: ["8.4", "51.9", "15.1", "21.6"],
  blobTreeAnswer: "",
  blobTreeOptionInfo: {},
  blobTreeOptionAnswer: "",
  discoveryPhaseTitle: "",
  endPhaseTitle: "",
  endDescription: "",
  startIntro: "",
  explorationIntro: "",
  discoveryIntro: "",
  endIntro: "",
}
if (lang === 'zh') {
  texts.startPhaseTitle = "『起始篇章』"
  texts.userPostsAnswer = "好的，感谢您真诚的分享。这能够帮助我对您有初步的了解。接下来，让我们通过几个有趣的问题，进一步探索您的独特倾向。"
  texts.explorationPhaseTitle1 = "『探索篇章』（前篇）"
  texts.explorationPhaseTitle2 = "『探索篇章』（后篇）"
  texts.mbtiOptionInfo = {
    '1': "这是瑞士艺术家 Seline Burn 所创作的《Sweet daily life》，捕捉了日常生活中惬意而亲切的瞬间。",
    '2': "这是美国艺术家 Edward Hopper 于1942年创作的《Nighthawks》，从一家街边餐馆中描绘出一座大城市的孤独。",
    '3': "这是日本艺术家 Surat Tomornsak 的作品，这是一位喜欢孩子们的简单、天真、新鲜的插画家。他主要创作日本 kawaii 风格的作品。",
    '4': "这是荷兰艺术家 Mondrian 于1930年创作的抽象艺术作品《Composition II with Red, Blue and Yellow》，代表了 Mondrian 的新艺术风格，强调几何形状的纯净和构图的平衡。",
    '5': "这是俄罗斯艺术家 Kazimir Malevich 于1916年创作的《Suprematist composition》，是超现实主义的代表作之一，强调了形式和构图的重要性。",
    '6': "这是美国艺术家 George Condo 于1997 年创作的《The butcher's wife》，其中卡通化的特征既可爱又畸形，完美地诠释了 George Condo 的“人造现实主义”概念。",
    '7': "这是美国艺术家 George Tooker 于1956年创作的《Government Bureau》勾勒出一个充满隔间的阴冷室内，隔间内雇员茫然的眼神给人一种不安的疏远感。",
    '8': "这是法国艺术家 Alfred Sisley 于1872年创作的《Bridge at Villeneuve-la-Garenne》，是印象派绘画风格的代表之一。Alfred Sisley 以描绘自然光影和户外场景而闻名，他的作品展现了对自然环境的敏感和独特的艺术视角。",
    '9': "这是西班牙艺术家 Pablo Picasso 于1921年创作的油画《Nous autres musiciens (Three Musicians) 》，以明亮丰富的颜色、简化的形状和具象化的元素为特征，展现了 Pablo Picasso 在这一时期对于形式的大胆实验和对于主题的独特演绎。"
  }
  texts.mbtiOptionAnswer = "您和过去的大师产生了共鸣！"
  texts.philosophyFixedAnswer = "非常有意思的观点！我想应该会有很多人与您持相似看法。据不完全统计，有"
  texts.philosophyFreeAnswer = "您独特的见解令我眼前一亮！"
  texts.philosophyFixedAnswerPart2 = "的用户和您选择了相同的选项。"
  texts.blobTreeAnswer = "刚才这道题是经典的 blob tree 心理投射测试。"
  texts.blobTreeOptionInfo = {
    '1': '您的选择可能表明您是一个自信、生活幸福、乐观的人。您是一个聪明的人，能够看到事物宏观的愿景，把事情放到适当的角度。',
    '2': '您的选择可能表明您是一个雄心勃勃、自信的人。您知道自己在任何时候都会成功，总会有幸运且恰当的情况帮我您进步',
    '3': '您的选择可能表明您是一个雄心勃勃、自信的人。您知道自己在任何时候都会成功，总会有幸运且恰当的情况帮我您进步',
    '4': '您的选择可能表明您是一个不合群、猜疑和不信任的人。您放弃得太快，不相信自己非凡的潜力。',
    '5': '您的选择可能表明您是一个富有创造力、热爱生活、享受每一刻、热爱和知道感恩周围所有美好事物的人。这有助于您保持积极的态度，所以您总是对最好的敞开大门！',
    '6': '您的选择可能表明您有需要感受被爱、被保护、被安全的需求。您总是爱上错误的人，因为您对爱和感情的无穷需求。您需要学会更仔细地寻找那些能帮助您在您的进化中的人，而不是那些不理解您的脆弱的人。',
    '7': '您的选择可能表明您是一个善于沟通、懂得给朋友支持的人。您以高情商为特点，这有助于您成功地应对生活中的各种情况。您有团队精神，看到事物的各个方面，总是找到解决方案。',
    '8': '您的选择可能表明您是一个梦幻和浪漫的人。您喜欢有一些时间只属于自己。这样，您就能够恢复精力和对生活和社交的热情。对于所爱的人来说，理解您对隔离的需求，不要误解它，理解它，并给您需要的空间是很好的。',
    '9': '您的选择可能表明您是一个不合群、猜疑和不信任的人。您会为了证明自己是了不起的，而更容易远离别人，独自站着，因为这也可以证明您对别人的不信任是合理的。',
    '10': '您的选择可能表明您是一个雄心勃勃，但也非常谨慎的人。您是一个勤劳和坚定的人，所以您几乎在您设定的任何事情上都会成功。您的想法总是脱颖而出，您在任何环境中都受到赞赏。',
    '11': '您的选择可能表明您是一个善于沟通、懂得给朋友支持的人。您以高情商为特点，这有助于您成功地应对生活中的各种情况。您有团队精神，看到事物的各个方面，总是找到解决方案。',
    '12': '您的选择可能表明您是一个善于沟通、懂得给朋友支持的人。您以高情商为特点，这有助于您成功地应对生活中的各种情况。您有团队精神，看到事物的各个方面，总是找到解决方案。',
    '13': '您的选择可能表明您现在充满绝望或正在失去希望。您必须尽力在生命树上重新校准自己，最简单的方法是重新获得自信，寻求所爱的人的支持！',
    '14': '您的选择可能表明您是一个灵魂伴侣、慈善家，愿意为他人做任何事。您以高度的同理心为特点，通常是“大灵魂”。但是您应该学会好好照顾自己，而不仅仅是他人。',
    '15': '您的选择可能表明您总是被通向成功的过程所吸引而不是成功本身。您好奇学习新事物，期待有新的经历，会因为遇见新的人，从每个人那里学到一些东西而高兴。',
    '16': '您的选择可能表明您是乐观、充满生活的人，具有团队精神，您在任何领域都表现出色，对挑战看得很淡。',
    '17': '您的选择可能表明您是乐观、充满生活的人，具有团队精神，您在任何领域都表现出色，对挑战看得很淡。',
    '18': '您的选择可能表明您是乐观、充满生活的人，具有团队精神，您在任何领域都表现出色，对挑战看得很淡。而且您喜欢感受被爱和被赏识。',
    '19': '您的选择可能表明您是一个不合群、猜疑和不信任的人。您可能有自恋倾向，对他人的成功感到嫉妒。',
    '20': '您的选择可能表明您是雄心勃勃、自信、充满生活的人，您是创新者，不怕冒险。您的超然和激情给您带来了许多成功和满足。',
    '21': '您的选择可能表明您是一个试图找到好好生活的解决方案却不知道如何是好的人。您也许可以尝试向周围的人寻求帮助，放弃您的猜疑本性，信任别人。',
  }
  texts.blobTreeOptionAnswer = "经过刚才的互动，我已对您有了一定了解啦。接下来的问题会更深入，希望您放松心情，选择与您的想法最相近的选项。"
  texts.discoveryPhaseTitle = "『发现篇章』"
  texts.endPhaseTitle = "『回响篇章』"
  texts.endDescription = "感谢您的回答！我已为您准备好一份专属个性报告，希望能帮助您更好地认识自我。这次轻松的对话不仅让我捕捉到了您的独特个性，也希望帮助您看清内心，接纳自我。每一个人都有属于自己的独特魅力，值得被认可与理解。如果日后您想要再次探索自我，欢迎随时来找我聊聊！我随时在这里等待您再次开启交流。"
  texts.startIntro = "（本章节有两道问答，主要是初步了解您的日常信息，帮助 Agent 定制您专属的 MBTI 问答和分析）"
  texts.explorationIntro = "（本章节共有四道问答（前篇两道+后篇两道），结合经典心理学的相关知识和工具，系统性地收集您的人格特征信息，保证 Agent 能从多个不同的角度跟您交流。每道题约需要等待 4-6 秒。）"
  texts.discoveryIntro = "（基于之前收集的信息和您的回答，在本章节 Agent 将会动态地跟您进行一系列多模块的探讨和交互。每个问答约需要等待 3-6 秒。另外，您也可以通过每道问题的赞同按钮来表达您的反馈，这会帮助我们进一步改进测评智能体。）"
  texts.endIntro = "（本章节将会综合前三个阶段的信息，为您生成专属人格分析和 MBTI 形象图。约需等待 25-35 秒。）"
} else if (lang === 'en') {
  texts.startPhaseTitle = "[Start Phase]"
  texts.userPostsAnswer = "Thanks for your sharing. It helps me to know you better. Now, let's explore your unique personality through some interesting questions."
  texts.explorationPhaseTitle1 = "[Exploration Phase (I)]"
  texts.explorationPhaseTitle2 = "[Exploration Phase (II)]"
  texts.mbtiOptionInfo = {
    '1': "This is Sweet daily life by Swiss artist Seline Burn, capturing the cozy and intimate moments in daily life.",
    '2': "This is Nighthawks by American artist Edward Hopper, depicting the loneliness of a big city from a street restaurant.",
    '3': "This painting I selected is the work of Japanese artist Surat Tomornsak, who is an illustrator who likes the simple, naive, and fresh children. He mainly creates works in the Japanese kawaii style.", 
    '4': "This is Composition II with Red, Blue and Yellow by Dutch artist Mondrian in 1930, which represents Mondrian's new artistic style, emphasizing the purity of geometric shapes and the balance of composition.",
    '5': "This is Suprematist composition by Russian artist Kazimir Malevich in 1916, which is one of the representative works of surrealism, emphasizing the importance of form and composition.",
    '6': "This is The butcher's wife by American artist George Condo in 1997, in which the cartoonish features are both cute and deformed, perfectly interpreting George Condo's concept of 'artificial realism'.",
    '7': "This is Government Bureau by American artist George Tooker in 1956, depicting a cold indoor space full of compartments, and the bewildered eyes of the employees in the compartments give people a sense of uneasiness and alienation.",
    '8': "This is Bridge at Villeneuve-la-Garenne by French artist Alfred Sisley in 1872, which is one of the representatives of the Impressionist painting style. Alfred Sisley is known for his depiction of natural light and outdoor scenes, and his works show his sensitivity to the natural environment and unique artistic perspective.",
    '9': "This is Nous autres musiciens (Three Musicians) by Spanish artist Pablo Picasso in 1921, which is characterized by bright and rich colors, simplified shapes and figurative elements. It shows Pablo Picasso's bold experiments with form and unique interpretation of themes during this period."
  };
  texts.mbtiOptionAnswer = "You resonate with the master!"
  texts.philosophyFixedAnswer = "Very interesting point of view! I think many people should have similar views with you."
  texts.philosophyFreeAnswer = "Your unique insights are refreshing!"
  texts.blobTreeAnswer = "The previous question is a classic blob tree psychological projection test."
  texts.blobTreeOptionInfo = {
    '1': 'Your selection shows you are a self-confident person, happy with your life and optimistic. You are an intelligent person, able to see the great picture and to put things into perspective.',
    '2': 'Your selection shows you are an ambitious and confident person. You know that you will succeed at all times and that there will always be convenient situations to help you in your evolution.',
    '3': 'Your selection shows you are an ambitious and confident person. You know that you will succeed at all times and that there will always be convenient situations to help you in your evolution.',
    '4': 'Your selection shows you are an unsociable, suspicious and distrustful person. You give up too quickly and not trust your extraordinary potential.',
    '5': 'Your selection shows you are creative, loves life, enjoys every moment, of love and knows how to be grateful for all the good things around you. This helps you maintain a positive outlook and so uou always have your doors open to the best!',
    '6': 'Your selection shows you are having needs to feel loved, protected, and safe. You are the kind of person who always falls in love with the wrong person, because of your inexhaustible need for affection and love. You need to learn to look more closely for those people who can help him in your evolution, and not for those who do not understand your vulnerability.',
    '7': 'Your selection shows you are communicative people who know how to offer support to your friends. You are characterized by high emotional intelligence, which helps you cope successfully with life situations. You have a team spirit, see the full side of the glass and always find solutions',
    '8': 'Your selection shows you are dreamy and romantic. You like to have some moments just for yourself. In this way, You regain your energy and zest for life and socialization. It is good for loved ones to understand your need for isolation and not misinterpret it, to understand it, and to give you the space You need.',
    '9': 'Your selection shows you are an unsociable, suspicious and distrustful person. You would do anything to prove that You are also wonderful, but it is easier to keep away from others and stand alone because in this way You justify your distrust of others.',
    '10': 'Your selection shows you are ambitious, but also very cautious. You are hardworking and determined, that’s why You succeed in almost anything You set out to do. your ideas always stand out and You are appreciated in any environment.',
    '11': 'Your selection shows you are communicative people who know how to offer support to your friends. You are characterized by high emotional intelligence, which helps you cope successfully with life situations. You have a team spirit, see the full side of the glass and always find solutions',
    '12': 'Your selection shows you are communicative people who know how to offer support to your friends. You are characterized by high emotional intelligence, which helps you cope successfully with life situations. You have a team spirit, see the full side of the glass and always find solutions',
    '13': 'Your selection shows you are filled with despair and loss of hope. You have to do your best to recalibrate yourselves in the tree of life and the easiest way is to regain your self-confidence, seeking the support of loved ones!',
    '14': 'Your selection shows you are a soulmate, a philanthropist, would do anything to help others. You are characterized by much empathy and are usually a “great soul.” But You should learn to take great care of yourself, not just others.',
    '15': 'Your selection shows you are motivated by the beauty of the road to success rather than the success itself. You are curious to learn new things, to have new experiences, to meet people, and to learn something from each one.',
    '16': 'Your selection shows you are optimistic, full of life, with a team spirit, You perform in any field and look at the challenges with detachment.',
    '17': 'Your selection shows you are optimistic, full of life, with a team spirit, You perform in any field and look at the challenges with detachment.',
    '18': 'Your selection shows you are optimistic, full of life, with a team spirit, You perform in any field and look at the challenges with detachment. And You like to feel loved and appreciated.',
    '19': 'Your selection shows you are an unsociable, suspicious and distrustful person. You may have narcissistic inclinations and is envious of the success of others.',
    '20': 'Your selection shows you are ambitious, confident, and full of life, You are innovator and not afraid to take risks. your detachment and passion bring you many successes and satisfactions.',
    '21': 'Your selection shows you are a person who tries but does not know how to find the best solutions for your life. You are a person who must learn to ask for help from those around you and give up your suspicious nature.'
  }
  texts.blobTreeOptionAnswer = "After the interaction just now, I have a certain understanding of you. The next question will be more in-depth. I hope you can relax and choose the option that is closest to you."
  texts.discoveryPhaseTitle = "[Discovery Phase]"
  texts.endPhaseTitle = "[End Phase]"
  texts.endDescription = "Thank you for your answers! I have prepared a customized personality report for you, hoping to help you better understand yourself. This relaxed conversation not only allows me to capture your unique personality, but also hopes to help you see your heart and accept yourself. Everyone has their own unique charm, which deserves to be recognized and understood. If you want to explore yourself again in the future, please feel free to come to me! I am always here waiting for you to start a conversation again."
  texts.startIntro = "(There are two questions in this chapter, mainly to understand your daily information and help Agent customize your exclusive MBTI questions and analysis.)" 
  texts.explorationIntro = "(There are four questions in this chapter (two in the first part + two in the second part). Combined with the relevant knowledge and tools of classical psychology, your personality information will be collected systematically to ensure that Agent can communicate with you from different perspectives. Each question takes about 4-6 seconds to wait.)"
  texts.discoveryIntro = "(Based on the information collected earlier and your answers, in this chapter, Agent will dynamically interact with you through a series of multi-module discussions. Each question takes about 3-6 seconds to wait. In addition, you can express your feedback through the agree button of each question, which will help us further improve the evaluation agent.)"
  texts.endIntro = "(This chapter will integrate the information of the previous three stages and generate a personalized personality analysis and MBTI image for you. It takes about 25-35 seconds to wait.)"
}

export function ChatList({ messages, chatDone, table, isLoading, isMessageFinished }: ChatList) {
  if (!messages.length) {
    return null
  }

  const chatID = messages[0].id;
  messages = messages.filter((message: Message) => message.role !== 'user' || !message.content.startsWith('start---'))
  var modifiedMessages = deepCopy(messages);
  if (messages.length >= 0) {
    modifiedMessages.splice(0, 0, {id: chatID, content: texts.startPhaseTitle, role: "system"}); // insert system message
    modifiedMessages.splice(1, 0, {id: chatID, content: texts.startIntro, role: "system"}); // insert system message
  }
  if (messages.length >= 4) {  // ask for user posts + user posts + 2
    modifiedMessages.splice(6, 0, {id: chatID, content: texts.explorationPhaseTitle1, role: "system"}); // insert system message
    modifiedMessages.splice(7, 0, {id: chatID, content: texts.explorationIntro, role: "system"}); // insert system message
  }
  if (messages.length >= 6) {  // ask for user posts + user posts + 4
    const mbtiAnswer = texts.mbtiOptionAnswer + " **" + texts.mbtiOptionInfo[messages[5].content] + "**";
    modifiedMessages.splice(10, 0, {id: chatID, content: mbtiAnswer, role: "assistant"}); // insert assistant message
  }
  if (messages.length >= 10) {  // ask for user posts + user posts + 6
    const blobTreeAnswer = texts.blobTreeAnswer + " **" + texts.blobTreeOptionInfo[messages[7].content] + "** " + texts.blobTreeOptionAnswer;
    modifiedMessages.splice(15, 0, {id: chatID, content: blobTreeAnswer, role: "assistant"}); // insert assistant message
    modifiedMessages.splice(16, 0, {id: chatID, content: texts.explorationPhaseTitle2, role: "system"}); // insert system message
  }
  if (messages.length >= 14) {
    modifiedMessages.splice(21, 0, {id: chatID, content: texts.discoveryPhaseTitle, role: "system"}); // insert system message
    modifiedMessages.splice(22, 0, {id: chatID, content: texts.discoveryIntro, role: "system"}); // insert system message
  }
  if (chatDone) {
    modifiedMessages.splice(modifiedMessages.length - 1, 0, {id: chatID, content: texts.endPhaseTitle, role: "system"}); // insert system message
    modifiedMessages.splice(modifiedMessages.length - 1, 0, {id: chatID, content: texts.endIntro, role: "system"}); // insert system message
    modifiedMessages.splice(modifiedMessages.length - 1, 0, {id: chatID, content: texts.endDescription, role: "assistant"}); // insert assistant message
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4" id="chat-list">
      {modifiedMessages.map((message: Message, index: number) => (
        <div key={index}>
          <ChatMessage message={message} chatDone={chatDone}/>
          {index < modifiedMessages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
      {isLoading && (
        <Separator className="my-4 md:my-8" />
      )}
      { !chatDone && ( 
        <div className="flex items-center justify-center h-16">
          <BeatLoader color={GetThemeColor().antiPrimary} loading={isLoading} size={10} />
        </div>
      )}
      { chatDone && isMessageFinished && (<FinalResult chatID={chatID} chatDone={chatDone} table={table} /> )}
    </div>
  )
}
