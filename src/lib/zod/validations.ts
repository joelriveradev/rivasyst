type FieldValidation = (value: string) => any

export const nameValidation: FieldValidation = (value) => {
  // Check if string contains only numbers: /^\d+$/
  // Check if string contains any numbers: /\d/
  return !(/^\d+$/.test(value) || /\d/.test(value))
}

export const emailValidation: FieldValidation = (value) => {
  // Basic format check (already done by .email() but being explicit)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // Common typos in popular domains
  const typoPatterns = [
    /@g?mail\.co$/, // Catches gmail.co instead of .com
    /@yahooo?\./, // Catches yahoooo.com
    /@hotmaill?\./, // Catches hotmaill.com
    /@.*?\.con$/, // Catches .con instead of .com
    /@.*?\.cpm$/, // Catches .cpm instead of .com
    /@.*?\.comm$/, // Catches .comm
  ]

  if (!emailRegex.test(value)) return false
  if (typoPatterns.some((pattern) => pattern.test(value))) return false

  // Check parts of email
  const [local, domain] = value.split('@')

  if (local.length > 64) return false
  if (domain.length > 255) return false

  return true
}

export const phoneValidation: FieldValidation = (value) => {
  // Common US phone formats
  const phonePatterns = [
    /^\(\d{3}\) \d{3}-\d{4}$/, // (555) 555-5555
    /^\d{3}-\d{3}-\d{4}$/, // 555-555-5555
    /^\d{10}$/, // 5555555555
    /^1\d{10}$/, // 15555555555
    /^\+1\d{10}$/, // +15555555555
    /^1?\s?\(\d{3}\)\s?\d{3}-\d{4}$/, // 1 (555) 555-5555
    /^\d{3}\.\d{3}\.\d{4}$/, // 555.555.5555
  ]

  // Check if value matches any valid format
  const isValidFormat = phonePatterns.some((pattern) => pattern.test(value))
  if (!isValidFormat) return false

  // Extract just the digits
  const digits = value.replace(/\D/g, '')

  // Check length (10 digits or 11 with country code)
  if (digits.length !== 10 && digits.length !== 11) return false

  // If 11 digits, first digit should be 1
  if (digits.length === 11 && digits[0] !== '1') return false

  // Check area code (first 3 digits after country code)
  const areaCode = digits.slice(-10, -7)
  if (areaCode[0] === '0' || areaCode[0] === '1') return false

  // Check exchange code (next 3 digits)
  const exchangeCode = digits.slice(-7, -4)
  if (exchangeCode[0] === '0' || exchangeCode[0] === '1') return false

  return true
}
