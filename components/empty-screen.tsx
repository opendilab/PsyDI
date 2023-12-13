import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const lang = process.env.LANG || 'zh' // default to zh
const exampleMessagesOld = [
  {
    heading: 'A go master (INTJ)',
    message: `I like playing Go.\nIt feels good to gradually improve after defeating your opponents.`
  },
  {
    heading: 'A college student (INFP)',
    message: `I need space to work this out, don't bother me.`
  },
  {
    heading: 'A 30s traveler (ENFP)',
    message: `I want to travel with my friends.\nIt’s too boring to be alone in this city.`
  }
]

type Message = {
  heading: string;
  message: string;
};
const exampleMessages: Message[] = []
var texts = {
  welcome: '',
  intro1: '',
  intro2: '',
  intro3: '',
  start: '',
}
if (lang === 'zh') {
    texts.welcome = '欢迎来到 PsyDI！'
    texts.intro1 = "这是一个由 OpenDILab 开发的 MBTI 测评智能体。"
    texts.intro2 = "您好，我是您的 MBTI 测评 AI 智能体，希望通过轻松的对话，共同探索您独特的个性和倾向。"
    texts.intro3 = "为了更好地了解您，我会先询问您最近的一些想法，然后邀请您完成一个简单有趣的测试。这将帮助我捕捉到您珍贵的内在世界。基于对您的了解，我会进一步提出问题来探寻您内在的动机，您只需要放松地选出最让您感到舒适的选项。最终，我们将一起解读测试结果，帮助您更好地发现自我。"
    texts.start = "现在开始测试"
} else if (lang === 'en') {
    texts.welcome = 'Welcome to PsyDI!'
    texts.intro1 = "This is an open source MBTI test AI developed by OpenDILab."
    texts.intro2 = "In this app, you will delve into the exploration of your MBTI through in-depth questioning and answers with AI." 
    texts.intro3 = "You can start a MBTI exploration with your posts or try the following examples:"
    texts.start = "Start the test now"
} else {
  // raise error  
  throw new Error('Language not supported: ' + lang)
}

export interface EmptyScreenProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'setInput'
  > {
  id?: string
}
export function EmptyScreen({ setInput, append, id }: EmptyScreenProps) {
  const handleClick = () => {
    console.info("send start message")
    append({
      id,
      content: "start",
      role: 'user'
    })
  }
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          {texts.welcome}
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          {texts.intro1}
          <ExternalLink href="https://github.com/opendilab">
            {""}
          </ExternalLink>
          <br></br>
        </p>
        <p className="leading-normal text-muted-foreground">
          {texts.intro2}
          <br></br>
          {texts.intro3}
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          <Button variant="link" className="h-auto p-0 text-base" onClick={handleClick} >
              <IconArrowRight className="mr-2 text-muted-foreground" />
          {texts.start}
          </Button>
          {/* examples */}
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
