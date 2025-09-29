"use client"

import { useState } from "react"
import { validateSchema, getSchemaTestUrl } from "@/utils/schema-validator"
import { Button } from "@/components/ui/button"

interface SchemaValidatorProps {
  schema: object
  schemaType: string
}

export default function SchemaValidator({ schema, schemaType }: SchemaValidatorProps) {
  const [validationResult, setValidationResult] = useState<{
    valid?: boolean
    errors?: string[]
  }>({})

  const [isValidating, setIsValidating] = useState(false)

  const handleValidate = async () => {
    setIsValidating(true)
    try {
      const result = await validateSchema(JSON.stringify(schema))
      setValidationResult(result)
    } catch (error) {
      setValidationResult({
        valid: false,
        errors: [(error as Error).message],
      })
    } finally {
      setIsValidating(false)
    }
  }

  return (
    <div className="p-4 border rounded-md bg-gray-50 my-4">
      <h3 className="text-lg font-medium mb-2">Schema Validator ({schemaType})</h3>
      <div className="mb-4">
        <Button onClick={handleValidate} disabled={isValidating} className="mr-2">
          {isValidating ? "Validating..." : "Validate Schema"}
        </Button>
        <a
          href={getSchemaTestUrl(schemaType)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Test with Google Rich Results
        </a>
      </div>

      {validationResult.valid !== undefined && (
        <div className={`p-3 rounded ${validationResult.valid ? "bg-green-100" : "bg-red-100"}`}>
          {validationResult.valid ? (
            <p className="text-green-800">Schema is valid!</p>
          ) : (
            <div>
              <p className="text-red-800 font-medium">Schema validation failed:</p>
              <ul className="list-disc pl-5 mt-1">
                {validationResult.errors?.map((error, index) => (
                  <li key={index} className="text-red-700">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
