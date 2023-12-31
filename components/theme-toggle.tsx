'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { IconMoon, IconSun } from '@/components/ui/icons'

export function GetThemeColor() {
  const { setTheme, theme } = useTheme()
  const primary = theme === 'light' ? '#ffffff' : '#000000';
  const secondary = theme === 'light' ? '#ffffbb' : '#000066';
  const antiPrimary = theme === 'light' ? '#000000' : '#ffffff';
  const antiSecondary = theme === 'light' ? '#000066' : '#ffffbb';
  return {primary: primary, secondary: secondary, antiPrimary: antiPrimary, antiSecondary: antiSecondary};
}

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [_, startTransition] = React.useTransition()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        startTransition(() => {
          setTheme(theme === 'light' ? 'dark' : 'light')
        })
      }}
    >
      {theme === 'dark' ? (
        <IconMoon className="transition-all" />
      ) : (
        <IconSun className="transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
