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
    <button
      // type="button"
      // layout

      // exit={{
      //   opacity: 0,
      //   transition: {
      //     duration: 0
      //   }
      // }}
      // initial={{
      //   opacity: 0,
      //   filter: 'blur(4px)'
      // }}
      // animate={{
      //   opacity: 1,
      //   filter: 'blur(0px)',
      //   transition: {
      //     delay: 0.1,
      //     duration: 0.3
      //   }
      // }}
      {...props}
      className={cn(
        'relative p-2 text-island-fg rounded-full cursor-pointer shrink-0 whitespace-nowrap z-0 font-medium outline-none active:scale-90 transition-all',
        className
      )}
    >
      {/* Animated hover/focus background */}
      {showBackground && (
        <motion.span
          layoutId="island-button-hover"
          className="absolute inset-0 bg-island-button-hover-bg rounded-full -z-10 "
          transition={{
            type: 'spring',
            duration: 0.2
          }}
        />
      )}
      {children}
    </button>
  )
}
