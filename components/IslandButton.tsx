import { motion, MotionProps } from 'motion/react'
import { cn } from '../lib/utils'
import { ComponentProps } from 'react'

type IslandButtonProps = ComponentProps<'button'> &
  MotionProps & {
    isHovered?: boolean
  }

export function IslandButton({
  className,
  children,
  isHovered,
  ...props
}: IslandButtonProps) {
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
      {...props}
      className={cn(
        'relative p-2 text-island-fg rounded-full cursor-pointer shrink-0 whitespace-nowrap z-0 font-medium',
        className
      )}
    >
      {/* Animated hover background */}
      {isHovered && (
        <motion.span
          layoutId="island-button-hover"
          className="absolute inset-0 bg-island-fg/10 rounded-full -z-10"
          transition={{
            type: 'spring',
            duration: 0.2
          }}
        />
      )}
      {children}
    </motion.button>
  )
}
