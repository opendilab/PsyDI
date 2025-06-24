'use client'


import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import { errorToaster } from '@/components/toaster'

const lang = process.env.NEXT_PUBLIC_PSYDI_LANG || 'zh' // default to zh

type Message = {
  heading: string;
  subheading: string;
  image: string;
  outsideLink: string;
};
var texts = {
  welcome: '',
  intro1: '',
  intro2: '',
  intro3: '',
  start: '',
  examples: '',
  outsideLinkErrorInfo: '',
}
var exampleMessages: Message[] = []
if (lang === 'zh') {
    texts.welcome = '欢迎来到 PsyDI！'
    texts.intro1 = "您好，我是由 "
    texts.intro2 = "开发的 MBTI 测评 AI 智能体，希望通过轻松的对话，共同探索您独特的个性和倾向。"
    texts.intro3 = "为了更好地了解您，我会先询问您最近的一些想法，然后邀请您完成一个简单有趣的测试。这将帮助我捕捉到您珍贵的内在世界。基于对您的了解，我会进一步提出问题来探寻您内在的动机，您只需要放松地选出最让您感到舒适的选项。最终，我们将一起解读测试结果，生成定制虚拟人格形象，帮助您更好地发现自我。（为获得最佳体验，请在浏览器中打开）"
    texts.start = "现在开始测试（入口）"
    texts.examples = "经典人物测试样例"
    texts.outsideLinkErrorInfo = "敬请期待"
    exampleMessages = [
    {
      heading: '维克托 INTJ',
      subheading: '海克斯科技，为了更美好的世界。欢迎加入光荣的进化吧，我愿做第一个献身者。',
      image: 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fgallery_viktor.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1758523925&Signature=JdsDK476%2FwPXfJH9sByRUZTmzJg%3D',
      outsideLink: 'http://xhslink.com/4VaTbH',
    },
    {
      heading: '金克斯 ESFP',    
      subheading: '哈！谁需要什么理由？拜托，做我的对手强一点？不然我真的要无聊到打哈欠。',
      image: 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fgallery_jinx.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1758523925&Signature=HyWZmamuwA5USXaJdPgaCj4jjxE%3D',
      outsideLink: 'http://xhslink.com/Bpt45F',
    },
    {
      heading: '约尔·福杰 ISFJ',
      subheading: '嗯，这可能听起来有点傻。但最近，我对自己作为妻子和母亲的能力有点不安。',
      image: 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fgallery_yueer2.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1758523925&Signature=DuEotRpYf%2BrfhbuqQIMAK45%2BuS4%3D',
      outsideLink: 'http://xhslink.com/13YTRE',
    },
    {
      heading: '阿尼亚·福杰 ENFP',
      subheading: '哇库哇库！我能读懂爸爸和妈妈的心思，他们在想什么我都知道！真的很有趣！',
      image: 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fgallery_aniya.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1758523925&Signature=pPu65XyXp0oe8tx1OYJ2UBbtHPs%3D',
      outsideLink: 'http://xhslink.com/Z929fF',
    },
    {
      heading: '黄昏 INTJ',
      subheading: '最近我越来越多地思考着我个人工作的长远影响。我一直在思考最终是否值得。',
      image: 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fgallery_huanghun.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1751802643&Signature=KY3tifqWXmIfh6L7kyuvNCqvVEY%3D',
      outsideLink: 'http://xhslink.com/WydWHL',
    },
    {
      heading: '菲比·布菲 ENFP',
      subheading: '这些混蛋或许不在乎你，但宇宙在乎你，这一点说明了很多，而这正是意义所在。',
      image: 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fgallery_feibi.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1751802643&Signature=L3drYGjrbBOpLuKR2kfxSR9QhX0%3D',
      outsideLink: 'http://xhslink.com/e6wRII',
    },
    {
      heading: '祁煜 INFP',
      subheading: '画作是内心的表达，我喜欢画画，但我的画廊不对外开放。',
      image: 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fgallery_qiyu.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1751802643&Signature=y2t54OTTihE7QZvC5PgpzhS3WT0%3D',
      outsideLink: 'http://xhslink.com/a/nUzESNmuvonW',
    },
    {
      heading: '秦彻 ENTJ',
      subheading: '只有弱者才会寻求安慰，我不需要。不过，力量上的悬殊并不代表高人一等。',
      image: 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fgallery_qinche.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1751802643&Signature=PSlvrtfSzyBxoIMHKQgiedaNnxs%3D',
      outsideLink: 'http://xhslink.com/a/nbkBN7WBNonW',
    },
    {
      heading: '约翰·华生 ISFJ',
      subheading: '无论多么艰难，我们都不能放弃追求真相。我总觉得这件事情背后隐藏着更大的秘密。',
      image: 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fgallery_huanghun.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1758523925&Signature=2WFKYONgRmzO%2BVL7REPKNXL3Y9w%3D',
      outsideLink: 'https://psydi.opendilab.org.cn',
    },
    {
      heading: '芙莉莲 INTP',
      subheading: '作为一个几千岁的精灵，我的日常就是如此，我对人类不断变化和变老的过程感到惊讶。',
      image: 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fgallery_fulilian.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1758523925&Signature=7ZI6lvFK671KCsK52c1uiHW%2BRjY%3D',
      outsideLink: 'https://psydi.opendilab.org.cn',
    },
    ]
} else if (lang === 'en') {
    texts.welcome = 'Welcome to PsyDI!'
    texts.intro1 = "Hi, I am an MBTI Agent developed by "
    texts.intro2 = ". I hope to explore your unique personality and tendencies through a relaxed conversation."
    texts.intro3 = "To better understand you, I will first ask you about your recent thoughts and then invite you to complete a simple and fun test. This will help me capture your precious inner world. Based on my understanding of you, I will ask further questions to explore your inner motivations, and you just need to relax and choose the option that makes you most comfortable. Finally, we will interpret the test results together, generate a customized virtual personality image to help you better discover yourself. (For the best experience, please open in a browser)"
    texts.start = "Start the test now (Entry)"
    texts.examples = "Classic character test examples"
    texts.outsideLinkErrorInfo = "Coming soon"
    exampleMessages = [
    {
      heading: 'Viktor INTJ',
      subheading: 'Hextech, for a better world. Welcome to the glorious evolution. I am willing to be the first to dedicate myself.',
      image: 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fgallery_viktor.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1750169838&Signature=ezgncXbsa5FEfSiOFovlWXQQDRg%3D',
      outsideLink: 'http://xhslink.com/4VaTbH',
    },
    {
      heading: 'Jinx ESFP',    
      subheading: 'Ha! Who needs a reason? Come on, make my opponent stronger? Or else I am really going to be bored to yawn.',
      image: 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fgallery_jinx.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1744798616&Signature=O8pEQ3Mndhg93X277ouMPdwYQGw%3D',
      outsideLink: 'http://xhslink.com/Bpt45F',
    },
    {
      heading: 'Yor Forger ISFJ',
      subheading: 'Well, it might sound a bit silly. But recently, I have been feeling a bit insecure about my abilities as a wife and mother.',
      image: 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fgallery_yueer2.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1744798616&Signature=F4dpf9sB4qfIcM7mhSRE%2FcKBN4Q%3D',
      outsideLink: 'http://xhslink.com/13YTRE',
    },
    {
      heading: 'Anya Forger ENFP',
      subheading: 'Waku waku! I can read what Daddy and Mommy are thinking, I know what they are thinking about! It is really interesting!',
      image: 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fgallery_aniya.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1744798616&Signature=YRXPZHbx%2B0rFL%2BNWyf55JM559JY%3D',
      outsideLink: 'http://xhslink.com/Z929fF',
    },
    {
      heading: 'Loid Forger INTJ',
      subheading: 'Lately, I have been increasingly pondering the long-term impact of my personal work, questioning whether it will ultimately be worth it.',
      image: 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fgallery_huanghun.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1743691262&Signature=m8AxDLAL5dXAEnt%2Btkfl3snmoPI%3D',
      outsideLink: 'http://xhslink.com/WydWHL',
    },
    {
      heading: 'Phoebe Buffay ENFP',
      subheading: 'These bastards may not care about you, but the universe does, and that says a lot.',
      image: 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fgallery_feibi.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1743691262&Signature=0qQlnzqs5XRma9ByKDMGW1H%2BQPA%3D',
      outsideLink: 'http://xhslink.com/e6wRII',
    },
    {
      heading: 'John Watson ISFJ',
      subheading: 'No matter how difficult it is, we cannot give up the pursuit of the truth. I always feel that there is a bigger secret hidden behind this matter.',
      image: 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fgallery_huasheng.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1744798616&Signature=L9GNUygygrQgSg3bYzfnb3NBrZo%3D',
      outsideLink: 'https://psydi.opendilab.org.cn',
    },
    {
      heading: 'Freya INTP',
      subheading: 'As an elf who has lived for thousands of years, this is my daily life. I am amazed by the constant change and aging process of humans.',
      image: 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fgallery_fulilian.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1744798616&Signature=oYgiuSimgRKvUBPRpNikKsNRcuE%3D',
      outsideLink: 'https://psydi.opendilab.org.cn',
    },
    ]
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
  setStartTest?: (startTest: boolean) => void
}
export function EmptyScreen({ setInput, append, id, setStartTest }: EmptyScreenProps) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-xl font-semibold">
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
          <Button variant="link" className="h-auto p-0 text-lg" onClick={
            async () => {
              setStartTest && setStartTest(true)
            }
          }>
              <IconArrowRight className="mr-2 text-muted-foreground" />
          {texts.start}
          </Button>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 p-2 border bg-white rounded-lg dark:bg-zinc-950">
        <span className="ml-1 text-base font-semibold">{texts.examples}</span>
        <span className="text-sm text-muted-foreground"></span>
          { exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={`cursor-pointer rounded-lg border bg-white p-3 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 shadow-md mb-1 ${
                  index > 100 && 'hidden md:block'
                }`}
                onClick={async () => {
                  if (example.outsideLink === 'https://psydi.opendilab.org.cn') {
                    errorToaster(texts.outsideLinkErrorInfo)
                  } else {
                    window.open(example.outsideLink)
                  }
                }}
              >
                <div className="text-sm font-semibold italic text-zinc-800 dark:text-zinc-200">{example.heading}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {example.subheading}
                </div>
                <img src={example.image} alt="" className="w-full h-32 object-cover rounded-lg mt-2" />
              </div>
            ))}
        </div>
    </div>
  )
}
