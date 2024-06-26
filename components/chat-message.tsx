// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'

import { cn } from '@/lib/utils'
import { CodeBlock } from '@/components/ui/codeblock'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { IconPsyDI, IconPsyDIBold, IconUser } from '@/components/ui/icons'
import { ChatMessageActions } from '@/components/chat-message-actions'

export interface ChatMessageProps {
  message: Message
  chatDone: boolean
}

const userMarkdownFormatLComplex = `<div style='text-align: left;text-align-last: left;'>
`
const userMarkdownFormatLSimple = `<div style='text-align: right;'>
`
const userMarkdownFormatR = `
</div>`

export function ChatMessage({ message, chatDone, ...props }: ChatMessageProps) {
  const processUserContent = (content: string) => {
    const splitContent = content.split(/\n|;|；/g)
    const maxLen = Math.max(...splitContent.map((item) => item.length))
    let processedContent = content
    processedContent = processedContent.replace(/\n|;|；/g, "<br>")
    if (maxLen > 16) {
      processedContent = userMarkdownFormatLComplex + processedContent + userMarkdownFormatR
    } else {
      processedContent = userMarkdownFormatLSimple + processedContent + userMarkdownFormatR
    }
    return processedContent
  }

  const processSystemContent = (content: string) => {
    if (content.startsWith("(") || content.startsWith("（")) {
      return '> ' + content.slice(1, content.length - 1)
    } else {
      return '> ### ' + content
    }
  }

  return (
    <div
      className={cn('group relative mb-4 flex items-start md:-ml-12')}
      {...props}
    >
    {message.role === 'user' ? (
      <>
      <div
        className={cn(
          'flex h-10 w-9 shrink-0 select-none items-center justify-center rounded-md'
        )}
      >
      </div>
      <div className="flex-1 px-1 mr-4 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 right-align"
          remarkPlugins={[remarkGfm, remarkMath]}
          //@ts-ignore
          rehypePlugins={[rehypeRaw]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == '▍') {
                  return (
                    <span className="mt-1 cursor-default animate-pulse">▍</span>
                  )
                }

                children[0] = (children[0] as string).replace('`▍`', '▍')
              }

              const match = /language-(\w+)/.exec(className || '')

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              )
            }

          }}
        >
          {processUserContent(message.content)}
        </MemoizedReactMarkdown>
        <ChatMessageActions message={message} />
      </div>
      <div
        className={cn(
          'flex h-10 w-9 shrink-0 select-none items-center justify-center rounded-md border shadow',
          'bg-background'
        )}
      >
        {<IconUser />}
      </div>
        </>
    ) : (
      <>
      { message.role === 'assistant' && (
        <div
          className={cn(
            'flex h-10 w-9 shrink-0 select-none items-center justify-center rounded-md border shadow',
            'bg-primary text-primary-foreground'
          )}
        >
          {<IconPsyDIBold />}
        </div>
      )}
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == '▍') {
                  return (
                    <span className="mt-1 cursor-default animate-pulse">▍</span>
                  )
                }

                children[0] = (children[0] as string).replace('`▍`', '▍')
              }

              const match = /language-(\w+)/.exec(className || '')

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              )
            }
          }}
        >
        { message.role === 'assistant' ? message.content : processSystemContent(message.content)}
        </MemoizedReactMarkdown>
        { message.role === 'assistant' && (!chatDone) && (
          <ChatMessageActions message={message} />
        )}
      </div>
      <div
        className={cn(
          'flex h-10 w-9 shrink-0 select-none items-center justify-center rounded-md',
        )}
      >
      </div>
      </>
    )}
    </div>
  )
}
