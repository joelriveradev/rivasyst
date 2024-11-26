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
  const digits = value.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 11
}
