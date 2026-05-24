import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { Analytics } from '@vercel/analytics/next'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Mohammad Azfar — AI/ML Engineering Student',
  description:
    'Building AI-assisted systems, developer tooling, and engineering workflows. B.Tech AI & ML at NMAM Institute of Technology.',
  openGraph: {
    title: 'Mohammad Azfar — AI/ML Engineering Student',
    description: 'Building AI-assisted systems, developer tooling, and engineering workflows.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-canvas text-chalk font-sans antialiased">
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  )
}
