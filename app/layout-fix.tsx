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
  generator: 'v0.app'
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
        
        {/* Ensure CSS is loaded first */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS to ensure basic styling works */
            body { margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
            * { box-sizing: border-box; }
            .min-h-screen { min-height: 100vh; }
            .flex { display: flex; }
            .flex-col { flex-direction: column; }
            .bg-blue-600 { background-color: #2563eb; }
            .text-white { color: white; }
            .text-center { text-align: center; }
            .font-bold { font-weight: bold; }
            .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
            .mb-4 { margin-bottom: 1rem; }
            .p-4 { padding: 1rem; }
            .px-4 { padding-left: 1rem; padding-right: 1rem; }
            .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
            .max-w-7xl { max-width: 80rem; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            .bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)); }
            .from-blue-600 { --tw-gradient-from: #2563eb; --tw-gradient-to: rgba(37, 99, 235, 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
            .to-purple-600 { --tw-gradient-to: #9333ea; }
            .bg-clip-text { background-clip: text; }
            .text-transparent { color: transparent; }
          `
        }} />
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
