import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      <ExternalLink href="https://github.com/opendilab">
        OpenDILab
      </ExternalLink>
      出品，版权所有 © 2024
      <br />
      对话内容由 AI 大模型生成，请仔细甄别。如有任何问题和建议，请联系
      <ExternalLink href="mailto:opendilab@pjlab.org.cn">
      邮箱
      </ExternalLink>
      或访问
      <ExternalLink href="https://github.com/opendilab/PsyDI">
      GitHub 主页
      </ExternalLink>
    </p>
  )
}
