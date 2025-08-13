import type { FC } from "react"

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items?: BreadcrumbItem[]
}

const BreadcrumbSchema: FC<BreadcrumbSchemaProps> = ({ items = [] }) => {
  // Don't render if no items or empty array
  if (!items || items.length === 0) {
    return null
  }

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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema),
      }}
    />
  )
}

export default BreadcrumbSchema
