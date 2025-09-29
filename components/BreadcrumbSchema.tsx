"use client"

import { useEffect } from "react"

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items?: BreadcrumbItem[]
}

export default function BreadcrumbSchema({ items = [] }: BreadcrumbSchemaProps) {
  useEffect(() => {
    if (!items || items.length === 0) return

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    }

    // Remove existing breadcrumb schema
    const existingScript = document.querySelector('script[data-schema="breadcrumb"]')
    if (existingScript) {
      existingScript.remove()
    }

    // Add new breadcrumb schema
    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.setAttribute("data-schema", "breadcrumb")
    script.textContent = JSON.stringify(breadcrumbSchema)
    document.head.appendChild(script)

    return () => {
      // Cleanup on unmount
      const scriptToRemove = document.querySelector('script[data-schema="breadcrumb"]')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [items])

  return null // This component doesn't render anything visible
}
