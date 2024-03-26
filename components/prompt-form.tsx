import { UseChatHelpers } from 'ai/react'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import { BeatLoader } from 'react-spinners'

import { Button, buttonVariants } from '@/components/ui/button'
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'
import { GetThemeColor } from '@/components/theme-toggle'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { cn } from '@/lib/utils'

const lang = process.env.LANG || 'zh' // default to zh
var texts = {
  newChat: "",
  sendMessage: "",
}
if (lang === 'zh') {
  texts.newChat = "新评测"
  texts.sendMessage = "发送回复"
} else if (lang === 'en') {
  texts.newChat = "New Chat"
  texts.sendMessage = "Send Message"
}

let debounceTimer: NodeJS.Timeout;

function debounce(func: Function, delay: number) {
  return function() {
    //@ts-ignore
    const context = this;
    //@ts-ignore
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => Promise<void>
  isLoading: boolean
  placeholder: string
  handleNewChat: () => void
  isSearch: boolean
  disableSubmit: boolean
}

type ListItem = {
  id: number;
  name: string;
};

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading,
  placeholder,
  handleNewChat,
  isSearch,
  disableSubmit,
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])
  const [results, setResults] = React.useState<ListItem[]>([]);
  const [isTyping, setIsTyping] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  
  const handleInputChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setResults([]);
    setIsTyping(false);
    setInput(value)
    setIsSearching(false);
    
    if (isSearch) {
      if (value.length > 0) {
        setIsTyping(true);
        debounce(async () => {
          setIsSearching(true);
          const res = await fetch(`/api/music_search?q=${value}`);
          const data = await res.json()
          const songResults = data.map((item: any) => {
            return {id: item.songID, name: `${item.songName} - ${item.artistName} - ${item.albumName}`}
          })
          if (isSearch && isTyping) {
            setResults(songResults);
          }
        }, 600)();
        return
      }
    }
  };
  const specialOnKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (!(isLoading || input === '' || disableSubmit)) {
      onKeyDown(event)
    }
  }

  // <li className="result-item"><BeatLoader color={GetThemeColor().antiPrimary} loading={results.length === 0} size={8} /></li>
  return (
    <form
      style={{ marginTop: '1px' }}
      onSubmit={async e => {
        setResults([]);  // clear last search results
        setIsTyping(false);
        setIsSearching(false);
        e.preventDefault()
        if (!input?.trim()) {
          return
        }
        setInput('')
        await onSubmit(input)
      }}
      ref={formRef}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleNewChat}
              className={cn(
                buttonVariants({ size: 'sm', variant: 'outline' }),
                'absolute left-0 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4'
              )}
            >
              <IconPlus />
              <span className="sr-only">{texts.newChat}</span>
            </button>
          </TooltipTrigger>
          <TooltipContent>{texts.newChat}</TooltipContent>
        </Tooltip>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={specialOnKeyDown}
          rows={1}
          value={input}
          onChange={handleInputChange}
          placeholder={placeholder}
          spellCheck={false}
          className="min-h-[60px] max-h-[90px] overflow-auto w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
        />
        {isTyping && (
          <ul className="results-list">
            { (results.length == 0) && isSearching && <li className="result-item flex items-center justify-center">Loading...</li>}
            { results.map(result => (
            <li key={result.id} className="result-item">
              <a onClick={() => { setInput(result.name); setResults([]); setIsSearching(false); setIsTyping(false) }}>
                {result.name}
              </a>
            </li>
            ))}
          </ul>
        )}
       <style jsx>{`
        .results-list {
          list-style: none;
          margin: 0;
          padding: 0;
          border: 1px solid #ccc;
        }
        
        .result-item {
          padding: 2px;
          cursor: pointer;
        }
        
        .result-item a {
          text-decoration: none;
          display: block;
          font-size: 10pt;
        }
        
        .result-item a:hover {
          background-color: #ccc;
        }
      `}</style>
        <div className="absolute right-0 top-4 sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || input === '' || disableSubmit}
              >
                <IconArrowElbow />
                <span className="sr-only">{texts.sendMessage}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{texts.sendMessage}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
