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

    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.textContent = JSON.stringify(breadcrumbSchema)
    script.id = "breadcrumb-schema"

    // Remove existing breadcrumb schema
    const existing = document.getElementById("breadcrumb-schema")
    if (existing) {
      existing.remove()
    }

    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById("breadcrumb-schema")
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [items])

  return null
}
