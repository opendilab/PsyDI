'use client'

import { type Message } from 'ai'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

import { Button } from '@/components/ui/button'
import { IconCheck, IconCopy, IconFullThumb, IconThumb } from '@/components/ui/icons'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { useSetThumb } from '@/lib/hooks/use-thumb'
import { cn } from '@/lib/utils'

interface ChatMessageActionsProps extends React.ComponentProps<'div'> {
  message: Message
}

export function ChatMessageActions({
  message,
  className,
  ...props
}: ChatMessageActionsProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })
  const { isThumbed, setThumb } = useSetThumb({ timeout: 2000 })

  const onCopy = () => {
    if (isCopied) return
    copyToClipboard(message.content)
  }
  const onThumb = () => {
    if (isThumbed) {
        setThumb(false)
    } else {
        setThumb(true)
    }
    // TODO: add thumb statistics
  }

  return (
    <div
      className={cn(
        'flex items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:-top-2 md:opacity-0',
        className
      )}
      {...props}
    >
     {message.role !== 'user' ? (
      <Button variant="ghost" size="icon" onClick={onThumb}>
        {isThumbed ? <ThumbUpIcon fontSize="small" /> : <ThumbUpAltOutlinedIcon fontSize="small"/>}
        <span className="sr-only">Thumb agent question</span>
      </Button>
     ): null}
      <Button variant="ghost" size="icon" onClick={onCopy}>
        {isCopied ? <IconCheck /> : <ContentCopyOutlinedIcon fontSize="small"/>}
        <span className="sr-only">Copy message</span>
      </Button>
    </div>
  )
}
