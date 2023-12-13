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

interface Texts {
  userPostsAnswer: string; 
  explorationPhaseTitle: string;
  mbtiOptionInfo: Record<string, any>;
  mbtiOptionAnswer: string;
  blobTreeAnswer: string;
  discoveryPhaseTitle: string;
}
var texts: Texts = {
  userPostsAnswer: "",
  explorationPhaseTitle: "",
  mbtiOptionInfo: {},
  mbtiOptionAnswer: "",
  blobTreeAnswer: "",
  discoveryPhaseTitle: "",
}
if (lang === 'zh') {
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
  texts.blobTreeAnswer = "原来如此！经过刚才的互动，我已对您有了一定了解啦。接下来的问题会更深入，希望您放松心情，选择与您最相近的选项。"
  texts.discoveryPhaseTitle = "『发现篇章』"
} else if (lang === 'en') {
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
    const key = parseInt(messages[4].content).toString();
    const mbtiInfo = texts.mbtiOptionInfo[key];
    modifiedMessages.splice(7, 0, {id: chatID, content: mbtiInfo + texts.mbtiOptionAnswer, role: "assistant"}); // insert assistant message
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
          {index < modifiedMessages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
    </div>
  )
}
