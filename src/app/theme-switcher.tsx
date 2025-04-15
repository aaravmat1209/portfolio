'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()
  const [isAnimating, setIsAnimating] = React.useState(false)

  const toggleTheme = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setTheme(theme === 'light' ? 'dark' : 'light')
      setTimeout(() => setIsAnimating(false), 600)
    }, 300)
  }

  return (
    <>
      <button
        className={`border-border bg-secondary-background mt-6 size-11 border-2 rounded-full p-0 
                 transition-all-medium hover:animate-pulse-glow overflow-hidden relative
                 ${isAnimating ? 'animate-rotate-in' : 'hover-rotate'}`}
        onClick={toggleTheme}
      >
        <Sun className={`stroke-foreground absolute inset-0 m-auto size-6 transition-all duration-300
                      ${theme === 'light' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
        <Moon className={`stroke-foreground absolute inset-0 m-auto size-6 transition-all duration-300
                      ${theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
        <span className="sr-only">Toggle theme</span>
      </button>
    </>
  )
}