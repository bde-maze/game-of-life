import { ReactNode } from 'react'
import { Jersey_20_Charted } from 'next/font/google'
import './globals.css'

const jersey20Charted = Jersey_20_Charted({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-jersey-20-charted',
})

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className={`${jersey20Charted.variable}`}>
      <body>
        <h1 className="font-mono text-8xl text-center px-5 mb-8">
          ~ Game of Life ~
        </h1>
        <div className="p-5 flex justify-center">{children}</div>
      </body>
    </html>
  )
}

export default RootLayout
