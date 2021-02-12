import { parsePhoneNumberFromString } from 'libphonenumber-js'

export const getFormattedNumber = (value) => {
  const parsed = parsePhoneNumberFromString(value, 'US')
  if(!parsed) return null
  const number = [parsed.number]
  if(parsed.ext) number.push(parsed.ext)
  return number.join('x')
}

export default getFormattedNumber
