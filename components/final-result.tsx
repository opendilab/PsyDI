'use client'

import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { BeatLoader } from 'react-spinners'

import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chat-message'
import { GetThemeColor } from '@/components/theme-toggle'

const lang = process.env.NEXT_PUBLIC_PSYDI_LANG || 'zh' // default to zh
var texts = {
  finalImagePrefix: '',
}
if (lang == 'zh') {
  texts.finalImagePrefix = '你的 MBTI 个性化定制形象图如下：'
} else if (lang == 'en') {
  texts.finalImagePrefix = 'Your MBTI personalized image is as follows:'
}

interface FinalResultProps {
  chatID: string
  chatDone: boolean
  table: Record<string, any> | null
};

export const FinalResult: React.FC<FinalResultProps> = ({chatID, chatDone, table}: FinalResultProps) => {
  const [finalResults, setFinalResults] = useState(null);
  const [userImgUrl, setUserImgUrl] = useState(null);
  const [qrcodeImgurl, setQrcodeImgUrl] = useState(null);
  const [headUrl, setHeadUrl] = useState(null);
  const [vizResult, setVizResult] = useState(null);
  
  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch('/api/final_results?q=analysis');
      const data = await res.json()
      setFinalResults(data.ret.result);
      setHeadUrl(data.ret.head_url);
      setVizResult(data.ret.viz_result);
    }, 3000);
    setTimeout(async () => {
      const resImg = await fetch('/api/final_results?q=figure');
      const dataImg = await resImg.json()
      setUserImgUrl(dataImg.ret.image_url);
      setQrcodeImgUrl(dataImg.ret.qrcode_image_url);
    }, 6000);
  }, []);

  return (
    <div id="final-result">
      { (finalResults === null) && ( 
          <Separator className="my-4 md:my-8" />
      )}
      { (finalResults === null) && ( 
        <div className="flex items-center justify-center h-16">
          <BeatLoader color={GetThemeColor().antiPrimary} loading={finalResults === null} size={10} />
        </div>
      )}
      { finalResults && (
        <div key={"finalResults"}>
          <Separator className="my-4 md:my-8" />
          <ChatMessage message={{id: chatID, role: 'assistant', 'content': `![head](${headUrl})${vizResult}` + finalResults}} chatDone={chatDone}/>
        </div>
      )}
      { finalResults && (userImgUrl === null) && ( 
        <Separator className="my-4 md:my-8" />
      )}
      { finalResults && (userImgUrl === null) && ( 
        <div className="flex items-center justify-center h-16">
          <BeatLoader color={GetThemeColor().antiPrimary} loading={userImgUrl === null} size={10} />
        </div>
      )}
      { userImgUrl && (
        <div key={"userImgUrl"}>
          <Separator className="my-4 md:my-8" />
          <ChatMessage message={{id: chatID, role: 'assistant', 'content': `**${texts.finalImagePrefix}** ![final img](${userImgUrl})\n![qrcode](${qrcodeImgurl})`}} chatDone={chatDone}/>
        </div>
      )}
    </div>
  )
};
