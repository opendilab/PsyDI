import { type Message } from 'ai'
import { BeatLoader } from 'react-spinners'

import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chat-message'
import { GetThemeColor } from '@/components/theme-toggle'

export interface ChatList {
  messages: Message[]
  chatDone: boolean
  isLoading: boolean
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
    '3': "这是美国艺术家 Andy Warhol 于 1962 年创作的《Marilyn Monroe》，以梦露的肖像为基础，运用 Andy Warhol 独特的艺术手法，呈现出了独特的视觉效果，成为波普艺术运动中的经典之一。",
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
  texts.blobTreeAnswer = "原来如此！经过刚才的互动，我已对您有了一定了解啦。接下来的问题会更深入，希望您放松心情，选择与您最相近的选项。（请稍等 15-25 秒为您生成定制化测试问题）"
  texts.discoveryPhaseTitle = "『发现篇章』"
  texts.endPhaseTitle = "『回响篇章』"
  texts.endDescription = "感谢您的回答！我已为您准备好一份专属个性报告，希望能帮助您更好地认识自我。这次轻松的对话不仅让我捕捉到了您的独特个性，也希望帮助您看清内心，接纳自我。每一个人都有属于自己的独特魅力，值得被认可与理解。如果日后您想要再次探索自我，欢迎随时来找我聊聊！我随时在这里等待您再次开启交流。"
  texts.startIntro = "（本章节只有一道问答，主要是初步了解您的日常信息，帮助 Agent 定制您专属的 MBTI 问答和分析）"
  texts.explorationIntro = "（本章节共有四道问答（前篇两道+后篇两道），结合经典心理学的相关知识和工具，系统性地收集您的人格特征信息，保证 Agent 能从多个不同的角度跟您交流。每道题约需要等待 3-10 秒。）"
  texts.discoveryIntro = "（基于之前收集的信息和您的回答，针对之前两个阶段的内容，在本章节 Agent 将会动态地跟您进行一系列的探讨和交互。每个问答约需要等待 8-15 秒。）"
  texts.endIntro = "（本章节将会综合前三个阶段的信息，为您生成专属人格分析和 MBTI 形象图。约需等待 25-45 秒。）"
} else if (lang === 'en') {
  texts.startPhaseTitle = "[Start Phase]"
  texts.userPostsAnswer = "Thanks for your sharing. It helps me to know you better. Now, let's explore your unique personality through some interesting questions."
  texts.explorationPhaseTitle1 = "[Exploration Phase (I)]"
  texts.explorationPhaseTitle2 = "[Exploration Phase (II)]"
  texts.mbtiOptionInfo = {
    '1': "This is Sweet daily life by Swiss artist Seline Burn, capturing the cozy and intimate moments in daily life.",
    '2': "This is Nighthawks by American artist Edward Hopper, depicting the loneliness of a big city from a street restaurant.",
    '3': "This is Marilyn Monroe by American artist Andy Warhol, based on Marilyn Monroe's portrait, using Andy Warhol's unique artistic techniques to present a unique visual effect, becoming one of the classics of the Pop Art movement.",
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
  texts.blobTreeAnswer = "I see! After our interaction, I have a better understanding of you. The following questions will be more in-depth. Please relax and choose the option that is closest to you. (Please wait 15-25 seconds for your customized test questions to be generated)"
  texts.discoveryPhaseTitle = "[Discovery Phase]"
  texts.endPhaseTitle = "[End Phase]"
  texts.endDescription = "Thank you for your answers! I have prepared a customized personality report for you, hoping to help you better understand yourself. This relaxed conversation not only allows me to capture your unique personality, but also hopes to help you see your heart and accept yourself. Everyone has their own unique charm, which deserves to be recognized and understood. If you want to explore yourself again in the future, please feel free to come to me! I am always here waiting for you to start a conversation again."
  texts.startIntro = "(This chapter only has one question and answer, mainly to understand your daily information and help Agent customize your exclusive MBTI questions and analysis)"
  texts.explorationIntro = "(There are four questions in this chapter (two in the first part + two in the second part). Combined with the relevant knowledge and tools of classical psychology, your personality information will be collected systematically to ensure that Agent can communicate with you from different perspectives. Each question takes about 3-10 seconds to wait.)"
  texts.discoveryIntro = "(According to the information collected before and your answers, Agent will dynamically discuss and interact with you based on the content of the previous two stages. Each question takes about 8-15 seconds to wait.)"
  texts.endIntro = "(This chapter will integrate the information of the previous three stages and generate a personalized personality analysis and MBTI image for you. It takes about 25-45 seconds to wait.)"
}

export function ChatList({ messages, chatDone, isLoading }: ChatList) {
  if (!messages.length) {
    return null
  }
  const chatID = messages[0].id;
  messages = messages.filter((message: Message) => message.role !== 'user' || message.content !== 'start')
  var modifiedMessages = deepCopy(messages);
  if (messages.length >= 0) {
    modifiedMessages.splice(0, 0, {id: chatID, content: texts.startPhaseTitle, role: "system"}); // insert system message
    modifiedMessages.splice(1, 0, {id: chatID, content: texts.startIntro, role: "system"}); // insert system message
  }
  if (messages.length >= 2) {  // ask for user posts + user posts
    modifiedMessages.splice(4, 0, {id: chatID, content: texts.explorationPhaseTitle1, role: "system"}); // insert system message
    modifiedMessages.splice(5, 0, {id: chatID, content: texts.explorationIntro, role: "system"}); // insert system message
  }
  if (messages.length >= 6) {  // ask for user posts + user posts + 4
    modifiedMessages.splice(10, 0, {id: chatID, content: texts.explorationPhaseTitle2, role: "system"}); // insert system message
  }
  if (messages.length >= 10) {
    modifiedMessages.splice(15, 0, {id: chatID, content: texts.discoveryPhaseTitle, role: "system"}); // insert system message
    modifiedMessages.splice(16, 0, {id: chatID, content: texts.discoveryIntro, role: "system"}); // insert system message
  }
  if (chatDone) {
    modifiedMessages.splice(modifiedMessages.length - 1, 0, {id: chatID, content: texts.endPhaseTitle, role: "system"}); // insert system message
    modifiedMessages.splice(modifiedMessages.length - 1, 0, {id: chatID, content: texts.endIntro, role: "system"}); // insert system message
    modifiedMessages.splice(modifiedMessages.length - 1, 0, {id: chatID, content: texts.endDescription, role: "assistant"}); // insert assistant message
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {modifiedMessages.map((message: Message, index: number) => (
        <div key={index}>
          <ChatMessage message={message} />
          {index < modifiedMessages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
      {isLoading && (
        <Separator className="my-4 md:my-8" />
      )}
      <div className="flex items-center justify-center h-16">
        <BeatLoader color={GetThemeColor().antiPrimary} loading={isLoading} size={10} />
      </div>
    </div>
  )
}
