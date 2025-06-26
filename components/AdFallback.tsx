interface AdFallbackProps {
  width?: number
  height?: number
  message?: string
  error?: string
}

export default function AdFallback({ width = 300, height = 250, message = "Advertisement", error }: AdFallbackProps) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        border: "1px solid #dee2e6",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#6c757d",
        fontSize: "14px",
        fontWeight: "500",
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
        padding: "16px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "24px", marginBottom: "8px", opacity: 0.5 }}>📢</div>
      <div style={{ marginBottom: "4px" }}>{message}</div>
      <div style={{ fontSize: "12px", opacity: 0.7 }}>Space Reserved</div>

      {error && (
        <div
          style={{
            fontSize: "10px",
            marginTop: "8px",
            padding: "4px 8px",
            background: "rgba(220, 53, 69, 0.1)",
            border: "1px solid rgba(220, 53, 69, 0.2)",
            borderRadius: "4px",
            color: "#dc3545",
            maxWidth: "100%",
            wordBreak: "break-word",
          }}
        >
          {error}
        </div>
      )}

      {/* Subtle pattern overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(0,0,0,0.02) 10px,
            rgba(0,0,0,0.02) 20px
          )`,
          pointerEvents: "none",
        }}
      />
    </div>
  )
}
