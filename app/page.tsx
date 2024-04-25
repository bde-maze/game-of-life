'use client'
import { useWindowSize } from 'react-use'
import { GameOfLife } from '@/components/client/GameOfLife'

interface GridMatrix {
  rows: number
  cols: number
}

const Page = () => {
  // Get the screen size
  const { width: screenWidth, height: screenHeight } = useWindowSize()

  // Calculate the grid size based on the screen size
  const gameGrid: GridMatrix = {
    rows: Math.round(screenHeight / 12),
    cols: Math.round(screenWidth / 10),
  }

  return (
    <>
      <GameOfLife rows={gameGrid.rows} cols={gameGrid.cols} />
    </>
  )
}

export default Page
