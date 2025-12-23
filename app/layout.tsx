import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Italian Brainrot Meme Generator 🇮🇹🧠',
  description: 'Generate hilarious Italian brainrot memes with AI automation!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
