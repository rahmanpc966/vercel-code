import Script from "next/script"

interface BreadcrumbSchemaProps {
  items?: {
    name: string
    url: string
  }[]
}

export default function BreadcrumbSchema({ items = [] }: BreadcrumbSchemaProps) {
  // Don't render anything if no items are provided
  if (!items || items.length === 0) {
    return null
  }

  const breadcrumbList = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  }))

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbList,
  }

  return (
    <Script id="breadcrumb-schema" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(schema)}
    </Script>
  )
}
