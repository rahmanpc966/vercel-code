import Script from "next/script"

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "YT2MP3",
    url: "https://yt2mate.pro/",
    logo: "https://yt2mate.pro/logo.svg",
    sameAs: ["https://twitter.com/yt2mp3", "https://facebook.com/yt2mp3"],
  }

  return (
    <Script id="organization-schema" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(schema)}
    </Script>
  )
}
