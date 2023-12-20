import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'
import Navbar from './ui/navbar'

const lato = Lato({ weight: ['100', '300', '400', '700', '900'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Korean Grammar Practice',
  description: 'Exercises for practiving Korean grammar concepts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <Navbar />
        <div className="pt-20">
          {children}
        </div>
      </body>
    </html>
  )
}
