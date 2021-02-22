import { parsePhoneNumberFromString } from 'libphonenumber-js'

export const formatPhoneNumber = (number) => {
  const parsed = parsePhoneNumberFromString(number, 'US')
  const formatted = parsed.number.match(/^\+1(\d{3})(\d{3})(\d{4})/).slice(1,4).join('-')
  return parsed.ext ? `${formatted} ext. ${parsed.ext}` : formatted
}

export const spokenPhoneNumber = (number) => {
  const phoneNumber = parsePhoneNumberFromString(number, 'US')
  const parts = []
  parts.push('area code')
  parts.push(phoneNumber.nationalNumber.split('').join(' '))
  if(!phoneNumber.ext) return parts.join(' ')
  parts.push('extension')
  parts.push(phoneNumber.ext.split('').join(' '))
  return parts.join(' ')

}
