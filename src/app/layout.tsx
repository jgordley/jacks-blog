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
        <div className="min-h-screen w-full">
          <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8 w-full">
              <Sidebar />
              <main className="flex-1 w-full">
                {children}
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
