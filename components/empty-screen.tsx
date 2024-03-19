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
var texts = {
  welcome: '',
  intro1: '',
  intro2: '',
  intro3: '',
  start: '',
}
if (lang === 'zh') {
    texts.welcome = '欢迎来到 PsyDI！'
    texts.intro1 = "您好，我是由 "
    texts.intro2 = "开发的 MBTI 测评 AI 智能体，希望通过轻松的对话，共同探索您独特的个性和倾向。"
    texts.intro3 = "为了更好地了解您，我会先询问您最近的一些想法，然后邀请您完成一个简单有趣的测试。这将帮助我捕捉到您珍贵的内在世界。基于对您的了解，我会进一步提出问题来探寻您内在的动机，您只需要放松地选出最让您感到舒适的选项。最终，我们将一起解读测试结果，帮助您更好地发现自我。"
    texts.start = "现在开始测试"
} else if (lang === 'en') {
    texts.welcome = 'Welcome to PsyDI!'
    texts.intro1 = "Hi, I am an MBTI Agent developed by "
    texts.intro2 = ". I hope to explore your unique personality and tendencies through a relaxed conversation."
    texts.intro3 = "You can start a MBTI exploration with your posts or try the following examples:"
    texts.start = "Start the test now"
} else {
  // raise error  
  throw new Error('Language not supported: ' + lang)
}
const exampleMessages = [
    {
      heading: '秦始皇 ENTJ',
      subheading: '世间纷扰，唯有横扫宇内，统一六国，求得长生不老，方可保我大秦万世基业。',
      image: 'https://bkmksh.oss-accelerate.aliyuncs.com/ac706ae2-67b1-4803-a0db-de14cfdbe414-0_00000_raw.jpg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317070829988&Signature=eO0hFL1jNebi3iOtWToePlDlMyk%3D',
    },
    {
      heading: '约尔 福杰 ESFJ',
      subheading: '嗯，这可能听起来有点傻。但最近，我对自己作为妻子和母亲的能力感到有些不安。',
      image: 'https://bkmksh.oss-accelerate.aliyuncs.com/8a7c0d9d-099a-473d-b114-c6dcdaa33c18-0_00000_raw.jpg?OSSAccessKeyId=LTAI5t8GmQec8vxNsiGKcYBT&Expires=317070824999&Signature=A%2BP6I6cMfG%2BPEZqcGzOlfuYDKoE%3D',
    },
]

export interface EmptyScreenProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'setInput'
  > {
  id?: string
  setStartTest?: (startTest: boolean) => void
}
export function EmptyScreen({ setInput, append, id, setStartTest }: EmptyScreenProps) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          {texts.welcome}
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          {texts.intro1}
          <ExternalLink href="https://github.com/opendilab">
            {"OpenDILab"}
          </ExternalLink>
          {texts.intro2}
          <br></br>
          {texts.intro3}
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          <Button variant="link" className="h-auto p-0 text-base" onClick={
            async () => {
              setStartTest && setStartTest(true)
            }
          }>
              <IconArrowRight className="mr-2 text-muted-foreground" />
          {texts.start}
          </Button>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 px-1 sm:px-0">
          { exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                  index > 1 && 'hidden md:block'
                }`}
                onClick={async () => {
                }}
              >
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-zinc-600">
                  {example.subheading}
                </div>
                <img src={example.image} alt="" className="w-full h-32 object-cover rounded-lg mt-2" />
              </div>
            ))}
        </div>
    </div>
  )
}
