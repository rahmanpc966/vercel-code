import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "yt2mate.pro - Premium Domain for Sale",
  description: "Premium domain yt2mate.pro is available for sale. Perfect for YouTube conversion services, music platforms, or multimedia businesses. Contact teamlumina66@gmail.com",
  keywords: "domain for sale, yt2mate.pro, premium domain, YouTube converter domain, music platform domain",
  openGraph: {
    title: "yt2mate.pro - Premium Domain for Sale",
    description: "Premium domain yt2mate.pro is available for sale. Perfect for YouTube conversion services, music platforms, or multimedia businesses.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "yt2mate.pro Domain for Sale",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}