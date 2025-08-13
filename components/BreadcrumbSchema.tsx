interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items?: BreadcrumbItem[]
}

export default function BreadcrumbSchema({ items = [] }: BreadcrumbSchemaProps) {
  // Don't render if no items
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
