"use client"

import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type React from "react"

export default function ContactClient() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [preview, setPreview] = useState<{ name: string; email: string; message: string } | null>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setPreview({ name, email, message })
      toast({
        title: "Form Submitted",
        description: "Your message has been received. Check the preview below.",
        duration: 5000,
      })
      setName("")
      setEmail("")
      setMessage("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process the form. Please try again.",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
          Contact YT2MP3 Support | Get Help with YouTube to MP3 Conversion
        </h1>

        <p className="text-center mb-8 text-gray-600 max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Fill out the form below, and we'll get back to you as
          soon as possible.
        </p>

        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
                placeholder="example@gmail.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full"
                placeholder="Your message here..."
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Send Message"}
            </Button>
          </form>
        </div>

        {preview && (
          <div className="mt-8 p-6 border rounded-lg bg-white shadow-sm max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Message Preview</h2>
            <div className="space-y-2">
              <p>
                <strong className="text-gray-700">Name:</strong> {preview.name}
              </p>
              <p>
                <strong className="text-gray-700">Email:</strong> {preview.email}
              </p>
              <p>
                <strong className="text-gray-700">Message:</strong>
              </p>
              <p className="whitespace-pre-wrap text-gray-600">{preview.message}</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
