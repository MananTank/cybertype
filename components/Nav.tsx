'use client'

import { ArrowRight } from 'lucide-react'
import { GithubIcon, TwitterIcon } from './icons'
import { useEffect, useRef } from 'react'

export function Footer() {
  const kbdRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter' && e.shiftKey && kbdRef.current) {
        kbdRef.current.setAttribute('data-pressed', '')
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
      if (e.key === 'Enter' && kbdRef.current) {
        kbdRef.current.removeAttribute('data-pressed')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <div className="flex items-center justify-center py-5 gap-5">
      <div className="flex items-center gap-2.5 text-secondary text-sm max-[1500px]:text-xs">
        <div
          ref={kbdRef}
          className="flex items-center gap-1 text-[0.9em] py-1 px-2.5 rounded bg-tertiary/40 font-mono tracking-wide transition-transform duration-100 data-pressed:scale-90 data-pressed:bg-tertiary/60"
        >
          <kbd className="text-[0.85em]">shift</kbd>
          <span className="text-secondary/50">+</span>
          <kbd className="text-[0.85em]">enter</kbd>
        </div>
        <ArrowRight className="size-3" />
        <div className="flex items-center gap-1.5 bg-tertiary/40 rounded-full px-3 py-1">
          <span className="text-[0.85em] tracking-wide">reset</span>
          <span className="">+</span>
          <span className="text-[0.85em] tracking-wide">shuffle</span>
        </div>
      </div>

      <div className="flex items-center gap-0.5">
        <a
          href="https://x.com/MananTank_"
          target="_blank"
          aria-label="Twitter/X Profile"
          className="flex justify-center items-center p-2 rounded-full hover:bg-tertiary/30 transition-colors"
        >
          <TwitterIcon className="size-5 text-secondary" />
        </a>
        <a
          href="https://github.com/MananTank/cybertype"
          target="_blank"
          aria-label="Github Repository"
          className="flex justify-center items-center p-2 rounded-full hover:bg-tertiary/30 transition-colors"
        >
          <GithubIcon className="size-5 text-secondary" />
        </a>
      </div>
    </div>
  )
}
