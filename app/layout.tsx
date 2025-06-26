import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ToastProvider } from "@/components/ui/toast"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | YT2MP3",
    default: "YT2MP3 - YouTube to MP3 Converter",
  },
  description: "Convert your favorite YouTube videos & shorts to high-quality MP3 files for free.",
  metadataBase: new URL("https://yt2mate.pro"),
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Monaco Editor Environment Setup */}
        <Script id="monaco-environment" strategy="beforeInteractive">
          {`
            if (typeof window !== 'undefined') {
              window.MonacoEnvironment = {
                getWorkerUrl: function (moduleId, label) {
                  if (label === 'json') {
                    return 'data:text/javascript;charset=utf-8,' + encodeURIComponent(\`
                      self.onmessage = function() { postMessage('json worker ready'); };
                    \`);
                  }
                  if (label === 'css' || label === 'scss' || label === 'less') {
                    return 'data:text/javascript;charset=utf-8,' + encodeURIComponent(\`
                      self.onmessage = function() { postMessage('css worker ready'); };
                    \`);
                  }
                  if (label === 'html' || label === 'handlebars' || label === 'razor') {
                    return 'data:text/javascript;charset=utf-8,' + encodeURIComponent(\`
                      self.onmessage = function() { postMessage('html worker ready'); };
                    \`);
                  }
                  if (label === 'typescript' || label === 'javascript') {
                    return 'data:text/javascript;charset=utf-8,' + encodeURIComponent(\`
                      self.onmessage = function() { postMessage('typescript worker ready'); };
                    \`);
                  }
                  return 'data:text/javascript;charset=utf-8,' + encodeURIComponent(\`
                    self.onmessage = function() { postMessage('editor worker ready'); };
                  \`);
                }
              };
            }
          `}
        </Script>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>

        {/* Google Analytics - Only load if measurement ID is available */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}

        {/* Environment Detection Script */}
        <Script id="environment-detection" strategy="afterInteractive">
          {`
            if (typeof window !== 'undefined') {
              // Set development flag for client-side use
              window.__IS_DEVELOPMENT__ = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
              
              // Handle ad blocking detection
              window.__AD_BLOCKED__ = false;
              
              // Suppress specific console warnings in production
              if (!window.__IS_DEVELOPMENT__) {
                const originalWarn = console.warn;
                console.warn = function(...args) {
                  const message = args.join(' ');
                  if (message.includes('NODE_ENV cannot be accessed') || 
                      message.includes('No available adapters') ||
                      message.includes('Unsupported prop change on Elements')) {
                    return;
                  }
                  originalWarn.apply(console, args);
                };
              }
            }
          `}
        </Script>
      </body>
    </html>
  )
}
