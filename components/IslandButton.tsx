import { motion, MotionProps } from 'motion/react'
import { cn } from '../lib/utils'
import { ComponentProps } from 'react'

type IslandButtonProps = ComponentProps<'button'> & MotionProps

export function IslandButton({ className, children, ...props }: IslandButtonProps) {
  return (
    <motion.button
      layout
      transition={{
        duration: 0.6,
        type: 'spring',
        bounce: 0.15
      }}
      exit={{
        opacity: 0,
        filter: 'blur(12px)'
      }}
      initial={{
        opacity: 0,
        filter: 'blur(12px)'
      }}
      animate={{
        opacity: 1,
        filter: 'blur(0px)'
      }}
      className={cn(
        'bg-transparent hover:bg-island-fg/10 p-2 rounded-full cursor-pointer shrink-0 whitespace-nowrap',
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}
