'use client'
// Packages
import { useEffect, useState } from 'react'

// Components
import { GameOfLife } from './components/client/GameOfLife'

const Page = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
  }, [])

  if (!isMounted) return null

  return (
    <div>
      <GameOfLife />
    </div>
  )
}

export default Page
