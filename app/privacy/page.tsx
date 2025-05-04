import type { Metadata } from "next"
import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"

export const metadata: Metadata = {
  title: "Privacy Policy - YT2MP3 YouTube to MP3 Converter",
  description:
    "Learn how YT2MP3 protects your privacy while using our YouTube to MP3 converter. Our comprehensive privacy policy explains data collection, usage practices, and the measures we take to ensure your information remains secure and protected at all times.",
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy | YT2MP3 YouTube to MP3 Converter Data Protection</h1>
        <div className="space-y-4">
          <p>
            At YT2MP3, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use,
            and safeguard your personal information when you use our YouTube to MP3 converter service.
          </p>
          <h2 className="text-2xl font-semibold mt-4">Information We Collect</h2>
          <p>
            We do not collect any personal information from our users. Our service is designed to be used without the
            need for user accounts or registration.
          </p>
          <h2 className="text-2xl font-semibold mt-4">How We Use Your Information</h2>
          <p>
            Since we do not collect personal information, we do not use or share any user data. The YouTube URLs you
            input for conversion are processed in real-time and are not stored on our servers.
          </p>
          <h2 className="text-2xl font-semibold mt-4">Cookies and Tracking</h2>
          <p>We do not use cookies or any other tracking technologies on our website.</p>
          <h2 className="text-2xl font-semibold mt-4">Third-Party Services</h2>
          <p>
            We use third-party APIs to process the YouTube to MP3 conversions. These services do not receive any
            personal information from our users.
          </p>
          <h2 className="text-2xl font-semibold mt-4">Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page.
          </p>
          <h2 className="text-2xl font-semibold mt-4">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us through our Contact page.</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
