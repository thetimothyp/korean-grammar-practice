import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'

const lato = Lato({ weight: ['100', '300', '400'] ,subsets: ['latin'] })

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
      <body className={lato.className}>{children}</body>
    </html>
  )
}
