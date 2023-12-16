import { type Message } from 'ai'

import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chat-message'

export interface ChatList {
  messages: Message[]
  chatDone: boolean
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
  explorationPhaseTitle: string;
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
}
var texts: Texts = {
  startPhaseTitle: "",
  userPostsAnswer: "",
  explorationPhaseTitle: "",
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
}
if (lang === 'zh') {
  texts.startPhaseTitle = "『起始篇章』"
  texts.userPostsAnswer = "好的，感谢您真诚的分享。这能够帮助我对您有初步的了解。接下来，让我们通过几个有趣的问题，进一步探索您的独特倾向。"
  texts.explorationPhaseTitle = "『探索篇章』"
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
} else if (lang === 'en') {
  texts.startPhaseTitle = "[Start Phase]"
  texts.userPostsAnswer = "Thanks for your sharing. It helps me to know you better. Now, let's explore your unique personality through some interesting questions."
  texts.explorationPhaseTitle = "[Exploration Phase]"
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
}

export function ChatList({ messages, chatDone }: ChatList) {
  if (!messages.length) {
    return null
  }
  //console.info(messages);
  const chatID = messages[0].id;
  messages = messages.filter((message: Message) => message.role !== 'user' || message.content !== 'start')
  var modifiedMessages = deepCopy(messages);
  if (messages.length >= 0) {
    modifiedMessages.splice(0, 0, {id: chatID, content: texts.startPhaseTitle, role: "system"}); // insert system message
  }
  if (messages.length >= 2) {  // ask for user posts + user posts
    modifiedMessages.splice(3, 0, {id: chatID, content: texts.userPostsAnswer, role: "assistant"}); // insert assistant message
    modifiedMessages.splice(4, 0, {id: chatID, content: texts.explorationPhaseTitle, role: "system"}); // insert system message
  }
  if (messages.length >= 4) {  // ask for user posts + user posts + mbti option + mbti option answer
    const key = parseInt(messages[3].content).toString();
    const mbtiInfo = texts.mbtiOptionInfo[key];
    modifiedMessages.splice(7, 0, {id: chatID, content: mbtiInfo + texts.mbtiOptionAnswer, role: "assistant"}); // insert assistant message
  }
  if (messages.length >= 6) {
    const userAnswer = messages[5].content;
    if (userAnswer.includes("(") && userAnswer.includes(")")) {
      const option2Index = {"(A)": 0, "(B)": 1, "(C)": 2, "(D)": 3}
      //@ts-ignore
      const ratio = texts.philosophyRatio[option2Index[userAnswer]] || "10.5"
      const finalString = texts.philosophyFixedAnswer + ` ${ratio}% ` + texts.philosophyFixedAnswerPart2;
      modifiedMessages.splice(10, 0, {id: chatID, content: finalString, role: "assistant"}); // insert assistant message
    } else {
      modifiedMessages.splice(10, 0, {id: chatID, content: texts.philosophyFreeAnswer, role: "assistant"}); // insert assistant messages
    }
  }
  if (messages.length >= 8) {  // ask for user posts + user posts + mbti option + mbti option answer + tram + tram answer + blob tree + blob tree answer
    modifiedMessages.splice(13, 0, {id: chatID, content: texts.blobTreeAnswer, role: "assistant"}); // insert assistant message
    modifiedMessages.splice(14, 0, {id: chatID, content: texts.discoveryPhaseTitle, role: "system"}); // insert system message
  }
  if (chatDone) {
    modifiedMessages.splice(modifiedMessages.length - 1, 0, {id: chatID, content: texts.endPhaseTitle, role: "system"}); // insert system message
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
    </div>
  )
}
