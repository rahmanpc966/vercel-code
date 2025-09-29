"use client"

import { useState, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type React from "react"

export default function YouTubeConverter() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    link?: string
    error?: string
    message?: string
    status?: string
  } | null>(null)
  const { toast } = useToast()
  const lastRequestedVideoId = useRef<string | null>(null)

  const extractVideoId = (url: string): string | null => {
    const regexPatterns = [
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(?:shorts\/)?(?:embed\/)?(?:v\/)?(?:share\/)?(?:embed\/)?(?:watch\?v=)?([^?&"'>]+)/,
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(?:shorts\/)?([^?&"'>]+)/,
    ]

    for (const pattern of regexPatterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }

    return null
  }

  const handleDownload = (downloadUrl: string) => {
    try {
      window.open(downloadUrl, "_blank")
    } catch (error) {
      console.error("Error opening download URL:", error)
      toast({
        title: "Download Error",
        description: "Failed to start download. Please try again.",
        duration: 5000,
      })
    }
  }

  const fetchConversion = useCallback(async (videoId: string) => {
    if (lastRequestedVideoId.current === videoId) {
      return
    }

    setLoading(true)
    setResult(null)
    lastRequestedVideoId.current = videoId

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setResult({
        link: data.link,
        message: data.message,
        status: data.status,
      })
    } catch (error) {
      console.error("Conversion error:", error)
      setResult({
        error: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const videoId = extractVideoId(url)
    if (!videoId) {
      setResult({
        error:
          "Invalid YouTube URL. Please enter a valid URL for a video or short (e.g., https://www.youtube.com/watch?v=VIDEO_ID or https://www.youtube.com/shorts/SHORT_ID)",
      })
      return
    }
    await fetchConversion(videoId)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 justify-center"
        aria-label="YouTube to MP3 converter form"
      >
        <Input
          type="text"
          placeholder="Paste YouTube video or short URL here"
          className="flex-1 bg-white text-black h-12 text-lg"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          aria-label="YouTube video URL"
        />
        <Button
          type="submit"
          className="bg-gray-900 hover:bg-gray-800 text-white px-6 h-12 text-lg"
          disabled={loading}
          aria-label="Convert to MP3"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          Convert to MP3
        </Button>
      </form>
      {result && (
        <div className="mt-4" aria-live="polite">
          {result.error ? (
            <p className="text-red-500 inline-block p-2 bg-white rounded" role="alert">
              {result.error}
            </p>
          ) : (
            <div className="text-center inline-block bg-white px-4 py-3 rounded">
              {result.message && (
                <p className="text-gray-700 mb-3">Conversion complete. You can now download your MP3.</p>
              )}
              {result.status === "completed" && (
                <button
                  onClick={() => handleDownload(result.link!)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded inline-flex items-center"
                  aria-label="Download MP3 file"
                >
                  <svg
                    className="fill-current w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                  </svg>
                  <span>Download MP3</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
