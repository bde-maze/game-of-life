'use client'

// Packages
import { PauseIcon, PlayIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'

type GridMatrix = {
  rows: number
  cols: number
}

export const Button = ({
  onClick,
  children,
}: {
  onClick: () => void
  children: React.ReactNode
}) => {
  return (
    <button
      type="button"
      className="shadow border border-white rounded-full px-3 py-1 hover:bg-gray-100 bg-gray-50 animation transition-all duration-200 ease-in-out"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export const GameOfLife = () => {
  // Get the screen size
  const { width: screenWidth, height: screenHeight } = useWindowSize()

  // Calculate the grid size based on the screen size
  const gameGrid: GridMatrix = {
    rows: Math.round(screenHeight / 12),
    cols: Math.round(screenWidth / 9),
  }

  const rows = gameGrid.rows
  const cols = gameGrid.cols

  // Methods
  const createEmptyGrid = (rows: number, cols: number) => {
    return Array(rows)
      .fill(0)
      .map(() => Array(cols).fill(false))
  }

  const updateCell = (row: number, col: number) => {
    const newGrid = grid.map((rowArr, rowIndex) =>
      row === rowIndex
        ? rowArr.map((cell, colIndex) => (col === colIndex ? !cell : cell))
        : rowArr
    )
    setGrid(newGrid)
  }

  // Controls
  const playPause = () => {
    setIsRunning(!isRunning)
  }

  const clear = () => {
    setGrid(createEmptyGrid(rows, cols))
    setIteration(0)
  }

  const randomStarter = () => {
    setGrid(grid.map((row) => row.map(() => Math.random() > 0.7)))
    setIteration(0)
  }

  const previousIteration = () => {
    if (iteration === 0) return
    setGrid(history[iteration - 1])
    setIteration(iteration - 1)
  }

  const nextIteration = () => {
    setGrid(
      grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const neighbors = [
            grid?.[rowIndex - 1]?.[colIndex - 1],
            grid?.[rowIndex - 1]?.[colIndex],
            grid?.[rowIndex - 1]?.[colIndex + 1],
            grid?.[rowIndex]?.[colIndex - 1],
            grid?.[rowIndex]?.[colIndex + 1],
            grid?.[rowIndex + 1]?.[colIndex - 1],
            grid?.[rowIndex + 1]?.[colIndex],
            grid?.[rowIndex + 1]?.[colIndex + 1],
          ]
          const aliveNeighbors = neighbors.filter(Boolean).length
          if (cell) {
            return aliveNeighbors === 2 || aliveNeighbors === 3
          } else {
            return aliveNeighbors === 3
          }
        })
      )
    )
    setIteration(iteration + 1)
  }

  const randomDeadOrAlive = () => {
    const random = Math.random()
    if (random > 0.7) return true
    return false
  }

  const generatePattern = (height: number, width: number) => {
    // Creates a pattern that is max 15x15 with a random dead or alive cell in each position
    const pattern = Array(height)
      .fill(0)
      .map(() => Array(width).fill(0))
      .map((row) => row.map(() => randomDeadOrAlive()))
    return pattern
  }

  // Gets a random pattern and adds it to a random position on the grid
  const addRandomPattern = () => {
    const maxWidth = 15
    const maxHeight = 15

    const width = Math.floor(Math.random() * maxWidth)
    const height = Math.floor(Math.random() * maxHeight)

    const randomRow = Math.floor(Math.random() * (rows - height))
    const randomCol = Math.floor(Math.random() * (cols - width))

    // Get a random pattern
    const pattern = generatePattern(height, width)

    // Apply the pattern to the grid
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (
          rowIndex >= randomRow &&
          rowIndex < randomRow + height &&
          colIndex >= randomCol &&
          colIndex < randomCol + width
        ) {
          return pattern[rowIndex - randomRow][colIndex - randomCol]
        }
        return cell
      })
    )
    setGrid(newGrid)
  }

  // Use States
  const [grid, setGrid] = useState(() => createEmptyGrid(rows, cols))
  const [iteration, setIteration] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isInfinite, setIsInfinite] = useState(false)
  const [history, setHistory] = useState([grid])

  // Use Effect
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      // Calculate the next grid
      const newGrid = grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const neighbors = [
            grid?.[rowIndex - 1]?.[colIndex - 1],
            grid?.[rowIndex - 1]?.[colIndex],
            grid?.[rowIndex - 1]?.[colIndex + 1],
            grid?.[rowIndex]?.[colIndex - 1],
            grid?.[rowIndex]?.[colIndex + 1],
            grid?.[rowIndex + 1]?.[colIndex - 1],
            grid?.[rowIndex + 1]?.[colIndex],
            grid?.[rowIndex + 1]?.[colIndex + 1],
          ]
          const aliveNeighbors = neighbors.filter(Boolean).length
          if (cell) {
            return aliveNeighbors === 2 || aliveNeighbors === 3
          } else {
            return aliveNeighbors === 3
          }
        })
      )

      // Check if grid is not the same on the 3 last iterations (to handle oscillators)
      if (
        JSON.stringify(newGrid) === JSON.stringify(grid) ||
        JSON.stringify(newGrid) ===
          JSON.stringify(
            history[history.length - 1] ||
              JSON.stringify(newGrid) ===
                JSON.stringify(history[history.length - 2]) ||
              JSON.stringify(newGrid) ===
                JSON.stringify(history[history.length - 3])
          )
      ) {
        // If infinite mode is on, add a random pattern else pause the game
        if (isInfinite) {
          addRandomPattern()
        } else {
          setIsRunning(false)
        }
      } else {
        setGrid(newGrid)
        setIteration(iteration + 1)
        setHistory([...history, newGrid])
      }
    }, 50)
    return () => clearInterval(interval)
  })

  return (
    <div className="p-5 flex justify-center">
      <div>
        {/* Game controls */}
        <div className="flex justify-center gap-y-3 gap-x-3 flex-wrap mb-5">
          <Button onClick={playPause}>
            {isRunning ? (
              <div className="flex items-center gap-1">
                <PauseIcon className="h-6 w-6" />
                <span>Pause</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <PlayIcon className="h-6 w-6" />
                <span>Play</span>
              </div>
            )}
          </Button>
          <Button onClick={clear}>Clear</Button>
          <Button onClick={addRandomPattern}>Add random pattern</Button>
          <Button onClick={randomStarter}>Random Starter</Button>
          <Button onClick={previousIteration}>Previous iteration</Button>
          <Button onClick={nextIteration}>Next iteration</Button>
        </div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <div>Iteration : {iteration}</div>
            <div>Population : {grid.flat().filter(Boolean).length}</div>
          </div>
          <button
            type="button"
            className={`${
              isInfinite ? 'bg-green-500 text-white' : 'bg-white'
            } px-2 py-1 rounded ml-2 border`}
            onClick={
              isInfinite
                ? () => setIsInfinite(false)
                : () => setIsInfinite(true)
            }
          >
            Infinite mode
          </button>
        </div>

        {/* Game Grid */}
        <div className="rounded-lg border-4 border-black p-3 shadow-xl">
          {grid &&
            grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className={`${
                      cell ? 'bg-black' : 'bg-white hover:bg-gray-200'
                    } border-[0.5px] border-gray-400 cursor-pointer w-2 h-2`}
                    onClick={() => {
                      updateCell(rowIndex, colIndex)
                    }}
                  ></div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
