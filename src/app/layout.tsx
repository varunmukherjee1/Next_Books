import './globals.css'
import { Inter } from 'next/font/google'

import Chat from '../components/Chat'
import Providers from '@/components/Providers'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next-Books',
  description: 'Your bookstore for fantasy and mystery books',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
            <Chat/>
            {children}
        </body>
      </Providers>
    </html>
  )
}
