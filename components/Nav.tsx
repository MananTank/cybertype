import { CornerDownLeft, ArrowRight } from 'lucide-react'
import { GithubIcon, TwitterIcon } from './icons'

export function Footer() {
  return (
    <div className="flex items-center justify-center mt-auto py-5 gap-5">
      <div className="flex items-center gap-2.5 text-secondary text-sm max-[1500px]:text-xs">
        <kbd className="flex items-center gap-1.5 text-[0.9em] py-1 px-2.5 rounded bg-tertiary/40 font-mono tracking-wide">
          <CornerDownLeft className="size-3" />
          enter
        </kbd>
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
