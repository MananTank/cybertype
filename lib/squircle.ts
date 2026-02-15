'use client'
import { useCallback, useEffect, useState } from 'react'
import './squircle.css'

// use CSS variable on initial render to have same styles on server and client
// use number for border radius on client for framer motion layout animations

export function useMotionSquircle() {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  return useCallback(
    (radius: number) => {
      if (!isClient) {
        return {
          borderRadius: `calc(${radius}px * var(--radius-multiplier))`,
          cornerShape: 'squircle'
        } as React.CSSProperties
      }

      if (CSS.supports('corner-shape', 'squircle')) {
        return {
          borderRadius: radius * 2,
          cornerShape: 'squircle'
        } as React.CSSProperties
      } else {
        return {
          borderRadius: radius
        } as React.CSSProperties
      }
    },
    [isClient]
  )
}
