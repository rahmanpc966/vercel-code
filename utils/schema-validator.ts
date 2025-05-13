/**
 * Schema Validator Utility
 *
 * This file provides functions to validate schema markup.
 * You can use this in development to ensure your schema is valid.
 */

export async function validateSchema(schemaJson: string): Promise<{
  valid: boolean
  errors?: string[]
}> {
  try {
    // In a real implementation, this would call an API like Google's Rich Results Test
    // For now, we'll do basic validation
    const schema = JSON.parse(schemaJson)

    // Check for required fields
    const errors: string[] = []

    if (!schema["@context"]) {
      errors.push("Missing @context property")
    }

    if (!schema["@type"]) {
      errors.push("Missing @type property")
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    }
  } catch (error) {
    return {
      valid: false,
      errors: [(error as Error).message],
    }
  }
}

export function getSchemaTestUrl(schemaType: string): string {
  return `https://search.google.com/test/rich-results?url=https://yt2mate.pro&user_agent=2&view=home&schema_type=${schemaType}`
}
