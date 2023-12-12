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
      出品，版权所有 © 2023
    </p>
  )
}
