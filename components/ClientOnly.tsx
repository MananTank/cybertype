import { useState, useEffect, ReactNode } from 'react'

type Props = {
  children: ReactNode
  ssr?: ReactNode
}

// wrap stuff with ClientOnly that is browser specific or is customized to the client ( using localStorage, etc )
export function ClientOnly({ children, ssr }: Props) {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  if (!hasMounted) {
    return ssr || null
  }
  return <> {children} </>
}
