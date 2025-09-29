interface AdFallbackProps {
  width?: number
  height?: number
  message?: string
  error?: string
}

export default function AdFallback({ width = 300, height = 250, message = "Advertisement", error }: AdFallbackProps) {
  // Return empty div with no visible content
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        margin: "0 auto",
        display: "block",
        // Completely invisible - no background, no border, no content
      }}
      aria-hidden="true"
    />
  )
}
