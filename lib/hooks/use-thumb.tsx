'use client'

import * as React from 'react'

export interface useThumbProps {
  timeout?: number
}

export function useSetThumb({
  timeout = 2000
}: useThumbProps) {
  const [isThumbed, setIsThumbed] = React.useState<Boolean>(false)

  const setThumb = (value: Boolean) => {

    setIsThumbed(value)
  }

  return { isThumbed, setThumb }
}
