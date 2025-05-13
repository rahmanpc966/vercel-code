import Link from "next/link"
import { ChevronRight } from "lucide-react"
import BreadcrumbSchema from "./BreadcrumbSchema"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const schemaItems = [
    { name: "Home", url: "https://yt2mate.pro/" },
    ...items.map((item) => ({ name: item.label, url: `https://yt2mate.pro${item.href}` })),
  ]

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1 text-gray-400" aria-hidden="true" />
              {index === items.length - 1 ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-blue-600">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <BreadcrumbSchema items={schemaItems} />
    </>
  )
}
