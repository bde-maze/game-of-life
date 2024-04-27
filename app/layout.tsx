// Packages
import { ReactNode } from 'react'

// Styles
import './globals.css'

// Fonts
import { Jersey_20_Charted } from 'next/font/google'

// Components
import LinkToGithubRepo from './components/server/LinkToGithubRepo'

const jersey20Charted = Jersey_20_Charted({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-jersey-20-charted',
})

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className={`${jersey20Charted.variable}`}>
      <body>
        <header className="flex justify-between my-8 mx-16">
          <div className="w-full" />
          <h1 className="font-mono text-4xl sm:text-8xl text-center px-5 mb-8 w-full whitespace-nowrap">
            ~ Game of Life ~
          </h1>
          <div className="w-full flex justify-end">
            <LinkToGithubRepo />
          </div>
        </header>

        {children}
        <footer className="text-center text-sm my-8 flex w-full justify-center">
          <a
            href="https://linktr.ee/barthelemy"
            target="_blank"
            className="hover:text-blue-600 transition-colors duration-100"
          >
            <span className="ml-2">Made by Barthelemy</span>
          </a>
        </footer>
      </body>
    </html>
  )
}

export default RootLayout
