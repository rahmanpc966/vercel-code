import type { Metadata } from "next"
import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"
import Breadcrumb from "@/components/Breadcrumb"
import OrganizationSchema from "@/components/OrganizationSchema"
import ArticleSchema from "@/components/ArticleSchema"

export const metadata: Metadata = {
  title: "Terms and Conditions - YT2MP3 YouTube to MP3 Converter",
  description: "Terms and Conditions for using YT2MP3 YouTube to MP3 Converter. Please read before using our service.",
  alternates: {
    canonical: "/terms",
  },
}

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="container mx-auto px-4 py-2">
        <Breadcrumb items={[{ label: "Terms and Conditions", href: "/terms" }]} />
      </div>

      <main className="flex-1 container mx-auto px-4 py-8">
        <article>
          <h1 className="text-3xl font-bold mb-6">
            Terms and Conditions | YT2MP3 YouTube to MP3 Converter Usage Policy
          </h1>
          <div className="space-y-4">
            <p>
              Welcome to YT2MP3. By using our service, you agree to comply with and be bound by the following terms and
              conditions of use. Please read these terms carefully before using YT2MP3.
            </p>
            <section>
              <h2 className="text-2xl font-semibold mt-4">1. Acceptance of Terms</h2>
              <p>
                By using YT2MP3, you agree to these terms and conditions. If you do not agree to all of these terms, you
                must not use this service.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mt-4">2. Use of Service</h2>
              <p>
                YT2MP3 is a free service that allows users to convert YouTube videos to MP3 format. You agree to use
                this service only for lawful purposes and in accordance with these terms.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mt-4">3. Intellectual Property Rights</h2>
              <p>
                You should only convert and download content for which you have the legal right to do so. YT2MP3 does
                not claim ownership of any converted content.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mt-4">4. Limitation of Liability</h2>
              <p>
                YT2MP3 is provided "as is" without any guarantees or warranty. In no event shall YT2MP3 be liable for
                any damages arising out of the use or inability to use our service.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mt-4">5. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Your continued use of YT2MP3 after changes are
                posted constitutes your acceptance of the modified terms.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mt-4">6. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
                YT2MP3 operates.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mt-4">Contact Us</h2>
              <p>
                If you have any questions about these Terms and Conditions, please{" "}
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
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
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
        title="Terms and Conditions | YT2MP3 YouTube to MP3 Converter Usage Policy"
        description="Terms and Conditions for using YT2MP3 YouTube to MP3 Converter. Please read before using our service."
        url="https://yt2mate.pro/terms"
        datePublished="2023-01-01T00:00:00Z"
        dateModified="2023-05-15T00:00:00Z"
        authorName="YT2MP3 Team"
      />
    </div>
  )
}
