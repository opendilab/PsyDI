import { type UseChatHelpers } from 'ai/react'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box';
import { Button as MuiButton } from '@mui/material';
import CatchingPokemonSharpIcon from '@mui/icons-material/CatchingPokemonSharp';

import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconRefresh, IconStop } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
}

type ConfirmationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const lang = process.env.LANG || 'zh' // default to zh
var texts = {
  initPlaceholder: '',
  imgPlaceholder: '',
  philosophyPlacehodler: '',
  blobTreePlaceholder: '',
  QAPlaceholder: '',
  generate: '',
  stop: '',
};
if (lang === 'zh') {
  texts.initPlaceholder = '请输入您的个人动态（以中文分号或换行符分隔）。'
  texts.imgPlaceholder = '请选择您喜欢的图片选项。(1-9)'
  texts.philosophyPlacehodler = '请选择上面的选项 (ABCD) 或输入您自己的答案。'
  texts.blobTreePlaceholder = '请输入您的选择的 blob 数字（1-21）。'
  //texts.QAPlaceholder = '选择上面的选项 (ABCD) 或输入您自己的答案。'
  texts.QAPlaceholder = '选择上面的选项 (ABCD) 。'
  texts.generate = '重新生成回复'
  texts.stop = '停止生成'
} else if (lang === 'en') {
  texts.initPlaceholder = 'Please enter your personal posts (separated by semicolons or newlines).'
  texts.imgPlaceholder = 'Please select your favourite images options (1-9).'
  texts.philosophyPlacehodler = 'Please select above options (ABCD) or enter your own answer.'
  texts.blobTreePlaceholder = 'Please enter the blob number of your choice (1-21).'
  texts.QAPlaceholder = 'Select above options or enter your own answer.'
  texts.generate = 'Regenerate response'
  texts.stop = 'Stop generating'
}

const ConfirmationDialog = ({ isOpen, onClose, onConfirm }: ConfirmationDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div style={{ display: isOpen ? 'block' : 'none'}}>
      <p style={{textAlign: 'center', fontSize: '18px'}}><b>您确定要开启新评测吗？</b></p>
    <Box
        sx={{
            display: 'grid',
            columnGap: 3,
            rowGap: 0,
            marginRight: 2,
            marginLeft: 2,
            marginDown: 0,
            marginTop: 2,
            gridTemplateColumns: 'repeat(2, 1fr)',
        }}
    >
      <MuiButton variant={'outlined'} sx={{ m: 0, border: 1, borderRadius: 2, boxShadow: 4, color: 'hsl(var(--primary))' }} onClick={handleConfirm}>确认</MuiButton>
      <MuiButton variant={'outlined'} sx={{ m: 0, border: 1, borderRadius: 2, boxShadow: 4, color: 'hsl(var(--primary))' }} onClick={onClose}>取消</MuiButton>
    </Box>
    </div>
  );
};

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages
}: ChatPanelProps) {
  const router = useRouter()
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleNewChat = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmNewChat = () => {
    router.refresh()
    router.push('/')
  };

  let placeholder = ''
  let enableOptionButtons = false
  if (messages?.length === 0) {
    placeholder = ''
  } else if (messages?.length === 2) {  // start phase + ask for post
    placeholder = texts.initPlaceholder
  } else if (messages?.length === 4) {
    placeholder = texts.imgPlaceholder
  } else if (messages?.length === 6){ 
    placeholder = texts.blobTreePlaceholder
  } else if (messages?.length > 7){ 
    placeholder = texts.QAPlaceholder
    if (messages[messages.length - 1].role === 'assistant') {
      enableOptionButtons = true
    }
  } else {
    placeholder = ''
  }

  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
        {/* placeholder */}
        </div>
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
            { isConfirmationOpen && (
                <ConfirmationDialog
                isOpen={isConfirmationOpen}
                onClose={handleCloseConfirmation}
                onConfirm={handleConfirmNewChat}
                />
            )}
            { enableOptionButtons && !isLoading && (
            <Box
                sx={{
                    display: 'grid',
                    columnGap: 3,
                    rowGap: 1,
                    marginRight: 2,
                    marginLeft: 2,
                    marginDown: 0,
                    gridTemplateColumns: 'repeat(2, 1fr)',
                }}
            >
            <MuiButton variant={'outlined'} sx={{ m: 0, border: 1, borderRadius: 2, boxShadow: 4, color: 'hsl(var(--primary))' }} disabled={isLoading} onClick={() => {
              append({
                id,
                content: '(A)',
                role: 'user'
              })
            }} startIcon={<CatchingPokemonSharpIcon />}>A</MuiButton>
            <MuiButton variant={'outlined'} sx={{ m: 0, border: 1, borderRadius: 2, boxShadow: 4, color: 'hsl(var(--primary))' }} disabled={isLoading} onClick={() => {
              append({
                id,
                content: '(B)',
                role: 'user'
              })
            }} startIcon={<CatchingPokemonSharpIcon />}>B</MuiButton>
            <MuiButton variant={'outlined'} sx={{ m: 0, border: 1, borderRadius: 2, boxShadow: 4, color: 'hsl(var(--primary))' }} disabled={isLoading} onClick={() => {
              append({
                id,
                content: '(C)',
                role: 'user'
              })
            }} startIcon={<CatchingPokemonSharpIcon />}>C</MuiButton>
            <MuiButton variant={'outlined'} sx={{ m: 0, border: 1, borderRadius: 2, boxShadow: 4, color: 'hsl(var(--primary))' }} disabled={isLoading} onClick={() => {
              append({
                id,
                content: '(D)',
                role: 'user'
              })
            }} startIcon={<CatchingPokemonSharpIcon />}>D</MuiButton>
            </Box>
            )}
          <PromptForm
            onSubmit={async value => {
              await append({
                id,
                content: value,
                role: 'user'
              })
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            placeholder={placeholder}
            handleNewChat={handleNewChat}
          />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}
