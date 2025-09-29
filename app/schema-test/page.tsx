"use client"

import { useState } from "react"
import SchemaValidator from "@/components/SchemaValidator"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

export default function SchemaTestPage() {
  const [schemaJson, setSchemaJson] = useState(
    '{\n  "@context": "https://schema.org",\n  "@type": "WebSite",\n  "name": "YT2MP3"\n}',
  )
  const [schemaType, setSchemaType] = useState("WebSite")

  const handleTest = () => {
    try {
      const schema = JSON.parse(schemaJson)
      return <SchemaValidator schema={schema} schemaType={schemaType} />
    } catch (error) {
      return <div className="p-3 bg-red-100 rounded">Invalid JSON: {(error as Error).message}</div>
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Schema Markup Testing Tool</h1>

        <div className="mb-4">
          <label htmlFor="schema-type" className="block text-sm font-medium text-gray-700 mb-1">
            Schema Type
          </label>
          <input
            type="text"
            id="schema-type"
            value={schemaType}
            onChange={(e) => setSchemaType(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="WebSite, Organization, etc."
          />
        </div>

        <div className="mb-4">
          <label htmlFor="schema-json" className="block text-sm font-medium text-gray-700 mb-1">
            Schema JSON
          </label>
          <textarea
            id="schema-json"
            value={schemaJson}
            onChange={(e) => setSchemaJson(e.target.value)}
            className="w-full p-2 border rounded font-mono text-sm"
            rows={10}
          />
        </div>

        {handleTest()}

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Common Schema Types</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>WebSite</strong> - For your main website
            </li>
            <li>
              <strong>Organization</strong> - For your business entity
            </li>
            <li>
              <strong>WebPage</strong> - For individual pages
            </li>
            <li>
              <strong>Article</strong> - For blog posts and articles
            </li>
            <li>
              <strong>FAQPage</strong> - For FAQ pages
            </li>
            <li>
              <strong>BreadcrumbList</strong> - For breadcrumb navigation
            </li>
            <li>
              <strong>WebApplication</strong> - For web applications like your converter
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  )
}
