import type { Metadata } from "next"
import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"
import Breadcrumb from "@/components/Breadcrumb"
import OrganizationSchema from "@/components/OrganizationSchema"
import ArticleSchema from "@/components/ArticleSchema"

export const metadata: Metadata = {
  title: "Privacy Policy - YT2MP3 YouTube to MP3 Converter",
  description:
    "Learn how YT2MP3 protects your privacy while using our YouTube to MP3 converter. Our privacy policy explains data collection and usage practices.",
  alternates: {
    canonical: "/privacy",
  },
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="container mx-auto px-4 py-2">
        <Breadcrumb items={[{ label: "Privacy Policy", href: "/privacy" }]} />
      </div>

      <main className="flex-1 container mx-auto px-4 py-8">
        <article>
          <h1 className="text-3xl font-bold mb-6">Privacy Policy | YT2MP3 YouTube to MP3 Converter Data Protection</h1>
          <div className="space-y-4">
            <p>
              At YT2MP3, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use,
              and safeguard your personal information when you use our YouTube to MP3 converter service.
            </p>
            <section>
              <h2 className="text-2xl font-semibold mt-4">Information We Collect</h2>
              <p>
                We do not collect any personal information from our users. Our service is designed to be used without
                the need for user accounts or registration.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mt-4">How We Use Your Information</h2>
              <p>
                Since we do not collect personal information, we do not use or share any user data. The YouTube URLs you
                input for conversion are processed in real-time and are not stored on our servers.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mt-4">Cookies and Tracking</h2>
              <p>We do not use cookies or any other tracking technologies on our website.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mt-4">Third-Party Services</h2>
              <p>
                We use third-party APIs to process the YouTube to MP3 conversions. These services do not receive any
                personal information from our users.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mt-4">Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mt-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please{" "}
                <a href="/contact" className="text-blue-600 hover:underline">
                  contact us
                </a>{" "}
                through our Contact page.
              </p>
            </section>
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Resources</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <a href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/faq" className="text-blue-600 hover:underline">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="/youtube-to-mp3" className="text-blue-600 hover:underline">
                  YouTube to MP3 Converter
                </a>
              </li>
              <li>
                <a href="/youtube-shorts-to-mp3" className="text-blue-600 hover:underline">
                  YouTube Shorts to MP3 Converter
                </a>
              </li>
            </ul>
          </section>
        </article>
      </main>

      <Footer />

      {/* Schema Markup */}
      <OrganizationSchema />
      <ArticleSchema
        title="Privacy Policy | YT2MP3 YouTube to MP3 Converter Data Protection"
        description="Learn how YT2MP3 protects your privacy while using our YouTube to MP3 converter. Our privacy policy explains data collection and usage practices."
        url="https://yt2mate.pro/privacy"
        datePublished="2023-01-01T00:00:00Z"
        dateModified="2023-05-15T00:00:00Z"
        authorName="YT2MP3 Team"
      />
    </div>
  )
}
