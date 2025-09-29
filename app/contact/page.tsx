import type { Metadata } from "next"
import ContactClient from "./contact-client"

export const metadata: Metadata = {
  title: "Contact Us - YT2MP3 YouTube to MP3 Converter",
  description:
    "Need help with our YouTube to MP3 converter? Contact our support team for assistance with conversions, downloads, or technical issues.",
  alternates: {
    canonical: "/contact",
  },
}

export default function Contact() {
  return <ContactClient />
}
