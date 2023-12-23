import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'
import Navbar from './ui/navbar'
import Scroll from './lib/components/scroll'
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';
import MobileNavbar from './ui/mobile-navbar'

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
      <Scroll />
      <body className={lato.className}>
        <NextTopLoader 
          showSpinner={false}
          shadow='none'
          color='rgb(79, 70, 229)'/>
        <Navbar />
        <MobileNavbar />
        <Toaster />
        <div className="pt-20">
          {children}
        </div>
      </body>
    </html>
  )
}
