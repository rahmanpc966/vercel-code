import Script from "next/script"

export default function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "YT2MP3 - YouTube to MP3 Converter",
    url: "https://yt2mate.pro/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://yt2mate.pro/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <Script id="website-schema" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(schema)}
    </Script>
  )
}
