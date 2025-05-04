import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ToastProvider } from "@/components/ui/toast"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "YT2MP3 - YouTube to MP3 Converter",
  description: "Convert your favorite YouTube videos & short to high-quality MP3 files for free.",
  metadataBase: new URL("https://yt2mate.pro"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "YT2MP3 - YouTube to MP3 Converter",
    description: "Convert your favorite YouTube videos & shorts to high-quality MP3 files for free.",
    url: "https://yt2mate.pro",
    siteName: "YT2MP3",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "YT2MP3 - YouTube to MP3 Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YT2MP3 - YouTube to MP3 Converter",
    description: "Convert your favorite YouTube videos & shorts to high-quality MP3 files for free.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Force reload of favicon by adding cache-busting query parameter */}
        <link rel="icon" href={`/favicon.ico?v=${Date.now()}`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`/favicon-32x32.png?v=${Date.now()}`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`/favicon-16x16.png?v=${Date.now()}`} />
        <link rel="apple-touch-icon" href={`/apple-touch-icon.png?v=${Date.now()}`} />
        <link rel="manifest" href={`/site.webmanifest?v=${Date.now()}`} />

        {/* Add this script to force favicon refresh */}
        <Script id="favicon-refresh" strategy="beforeInteractive">
          {`
            // Force favicon refresh
            function refreshFavicon() {
              const links = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]');
              links.forEach(link => {
                const href = link.getAttribute('href');
                if (href) {
                  link.setAttribute('href', href.split('?')[0] + '?v=' + Date.now());
                }
              });
            }
            
            // Run on page load
            refreshFavicon();
            
            // Also run when page becomes visible again (tab switching)
            document.addEventListener('visibilitychange', function() {
              if (document.visibilityState === 'visible') {
                refreshFavicon();
              }
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  )
}
