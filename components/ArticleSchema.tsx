import Script from "next/script"

interface ArticleSchemaProps {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  authorName: string
  imageUrl?: string
}

export default function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  imageUrl = "https://yt2mate.pro/og-image.jpg",
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "YT2MP3",
      logo: {
        "@type": "ImageObject",
        url: "https://yt2mate.pro/logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  return (
    <Script id="article-schema" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(schema)}
    </Script>
  )
}
