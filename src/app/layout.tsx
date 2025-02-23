import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import GoogleAnalytics from './components/GoogleAnalytics'
import Sidebar from './components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Developer Blog',
  description: 'A simple, classic developer blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <GoogleAnalytics />
        <div className="relative">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-64 flex-shrink-0">
                <Sidebar />
              </div>
              <div className="flex-1 px-4 py-8">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
