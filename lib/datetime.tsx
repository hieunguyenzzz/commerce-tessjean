export function formatdate(
  dateStr: string,
  locale = 'en-US',
  format: 'default' | 'long' | 'short' = 'default'
) {
  let options
  switch (format) {
    case 'long':
      options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      break
    case 'default':
    case 'short':
    default:
      break
  }
  return new Date(dateStr).toLocaleDateString(locale, options as any)
}
