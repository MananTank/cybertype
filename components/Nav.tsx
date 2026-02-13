import { Github } from 'lucide-react'

export function Footer() {
  return (
    <div className="nav flex items-center gap-4 mt-auto justify-center py-5 text-secondary">
      <span className="text-lg font-medium">cybertype</span>

      <a
        href="https://github.com/MananTank/cybertype"
        target="_blank"
        aria-label="Github Repository"
        className="flex justify-center items-center"
      >
        <Github className="size-5 text-secondary" />
      </a>
    </div>
  )
}
