import { motion, MotionProps } from 'motion/react'
import { cn } from '../lib/utils'
import { ComponentProps } from 'react'

type IslandButtonProps = ComponentProps<'button'> &
  MotionProps & {
    isHovered?: boolean
    isFocused?: boolean
  }

export function IslandButton({
  className,
  children,
  isHovered,
  isFocused,
  ...props
}: IslandButtonProps) {
  const showBackground = isHovered || isFocused

  return (
    <motion.button
      type="button"
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
        'relative p-2 text-secondary rounded-full cursor-pointer shrink-0 whitespace-nowrap z-0 font-medium outline-none',
        className,
        isHovered && 'text-primary'
      )}
    >
      {/* Animated hover/focus background */}
      {showBackground && (
        <motion.span
          layoutId="island-button-hover"
          className="absolute inset-0 bg-secondary/20 rounded-full -z-10"
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
