'use client'

import { useChat, type Message } from 'ai/react'
import { useState } from 'react'
import html2canvas from 'html2canvas';
import Box from '@mui/material/Box';

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { UserPortrait } from '@/components/user-portrait'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { errorToaster } from './toaster'
import { LinearProgressWithLabel } from '@/components/progress-bar'

const lang = process.env.NEXT_PUBLIC_PSYDI_LANG || 'zh' // default to zh
const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

var texts = {
  errorToasterText: ''
}
if (lang === 'zh') {
  texts.errorToasterText = '服务器超时错误，请重新回答或退回上个问题回答。如果依然无法解决，请点击左下角\'加号\'按钮重启评测，并稍后再试'
} else if (lang === 'en') {
  texts.errorToasterText = 'Server timeout error. Please retry or go back to the previous question. If the problem persists, please click the "+" button in the lower left corner to restart the evaluation and try again later.'
}


const takeFullPageScreenshot = () => {
  html2canvas(document.getElementById('chat-list') || document.body, {
    logging: true,
    allowTaint: true,
    useCORS: true,
    scale: 1,
    //foreignObjectRendering: true,
    //letterRendering: true,
  }).then((canvas) => {
    const data = canvas.toDataURL('image/png');
    //const blob = canvas.toBlob(blob => blob, 'image/png');
    //if (blob === null) {
    //  console.error('Failed to convert canvas to blob');
    //  return;
    //}
    // @ts-ignore
    //const data = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.download = 'psydi_final_full.png';
    link.href = data;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(data);
  }).catch((error) => {
    console.error('takeFullPageScreenshot failed', error);
  });
};

const takeFinalPageScreenshot = () => {
  html2canvas(document.getElementById('final-result') || document.body, {
    logging: true,
    allowTaint: true,
    useCORS: true,
    scale: 1,
    //foreignObjectRendering: true,
    //letterRendering: true,
  }).then((canvas) => {
    const data = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.download = 'psydi_final.png';
    link.href = data;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(data);
  }).catch((error) => {
    console.error('takeFinalPageScreenshot failed', error);
  });
};

export function Chat({ id, initialMessages, className }: ChatProps) {
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    'ai-token',
    null
  )
  const [previewTokenDialog, setPreviewTokenDialog] = useState(IS_PREVIEW)
  const [previewTokenInput, setPreviewTokenInput] = useState(previewToken ?? '')
  const [chatDone, setChatDone] = useState(false)
  const [table, setTable] = useState(null)
  const [responseStart, setResponseStart] = useState(false)
  const [startTest, setStartTest] = useState(false)
  const [isMessageFinished, setIsMessageFinished] = useState(false)
  const [percent, setPercent] = useState(0)
  const { messages, append, reload, stop, setMessages, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        id,
        previewToken
      },
      onResponse(response) {
        if (response.status === 401) {
          errorToaster(response.statusText)
        }
        if (response.headers.get('chat-errorcode') !== '0') {
            errorToaster(texts.errorToasterText, 10000)
        }
        setIsMessageFinished(false)
        
        const currentChatDone = response.headers.get('chat-done') === 'true'
        if (currentChatDone) {
          setChatDone(true)
          setPercent(100)
        }

        // @ts-ignore
        const table = response.headers.get('table')
        if (table !== 'null') {
          // @ts-ignore
          setTable(JSON.parse(table))
        }
        setResponseStart(true)
        setTimeout(() => {
          window.scrollTo({
            top: document.body.offsetHeight,
            behavior: 'smooth'
          }) 
        }, 400)
      },
      onFinish() {
        setIsMessageFinished(true)
        setTimeout(() => {
          window.scrollTo({
            top: document.body.offsetHeight,
            behavior: 'smooth'
          }) 
        }, 100)
        setResponseStart(false)
      }
    })
  const appendWithScroll = (message: any): Promise<string | null | undefined> => {
    const ret = append(message)
    const currentPercent = chatDone ? 100 : ((messages?.length || 0) - 1) * 2.05 + Math.random() * 2
    setPercent(currentPercent)
    setTimeout(() => {
      window.scrollTo({
        top: document.body.offsetHeight,
        behavior: 'smooth'
      })
    }, 10)
    return ret
  }

  const handleReset = () => {
    setStartTest(false)
    setChatDone(false)
    setPercent(0)
  }
  return (
    <>
      <Box sx={{ width: '100%' }} className="fixed z-50">
        <LinearProgressWithLabel value={percent} />
      </Box>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} chatDone={chatDone} table={table} isLoading={isLoading && (!responseStart)} isMessageFinished={isMessageFinished}/>
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          startTest ? (
              <UserPortrait append={append} id={id} />
            ) : (
              <EmptyScreen setInput={setInput} id={id} append={append} setStartTest={setStartTest}/>
          )
        )}
      </div>
      { startTest && messages?.length >= 1 && (<ChatPanel
        id={id}
        isLoading={isLoading || chatDone}
        stop={stop}
        append={appendWithScroll}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
        setMessages={setMessages}
        chatDone={chatDone}
        handleReset={handleReset}
        takeFullPageScreenshot={takeFullPageScreenshot}
        takeFinalPageScreenshot={takeFinalPageScreenshot}
      />
      )}

      <Dialog open={previewTokenDialog} onOpenChange={setPreviewTokenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your OpenAI Key</DialogTitle>
            <DialogDescription>
              If you have not obtained your OpenAI API key, you can do so by{' '}
              <a
                href="https://platform.openai.com/signup/"
                className="underline"
              >
                signing up
              </a>{' '}
              on the OpenAI website. This is only necessary for preview
              environments so that the open source community can test the app.
              The token will be saved to your browser&apos;s local storage under
              the name <code className="font-mono">ai-token</code>.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={previewTokenInput}
            placeholder="OpenAI API key"
            onChange={e => setPreviewTokenInput(e.target.value)}
          />
          <DialogFooter className="items-center">
            <Button
              onClick={() => {
                setPreviewToken(previewTokenInput)
                setPreviewTokenDialog(false)
              }}
            >
              Save Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
