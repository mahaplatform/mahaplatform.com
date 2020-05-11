import { getContact } from '../contacts'

const getFormattedMailingAddress = (values, i) => {
  const address = {
    street_1: values[`address_${i}_street_1`],
    street_2: values[`address_${i}_street_2`],
    city: values[`address_${i}_city`],
    state_province: values[`address_${i}_state_province`],
    postal_code: values[`address_${i}_postal_code`]
  }
  address.description = getFullAddress(address)
  return address
}

const getFullAddress = (address) => {
  const { street_1, street_2, city, state_province, postal_code } = address
  const parts = [street_1,street_2,city,state_province,postal_code]
  return parts.filter(item => {
    return typeof(item) === 'string' && item.length > 0
  }).join(', ')
}

const normalizeValue = (values, key) => {
  const value = values[key]
  const matches = key.match(/^address_(\d)(.*)$/)
  if(matches === null) return { [key]: value }
  if(matches[2] === '_street_1') {
    const newkey = `address_${matches[1]}`
    return {
      [newkey]: getFormattedMailingAddress(values, matches[1])
    }
  }
  return null
}

const normalizeValues = (values) => {
  return Object.keys(values).reduce((normalized, key) => {
    const value = normalizeValue(values, key)
    return {
      ...normalized,
      ...value
    }
  }, {})
}

const matchKeys = (values, regex) => {
  return Object.keys(values).reduce((matched, key) => [
    ...matched,
    ...regex.test(key) ? [values[key]] : []
  ], [])
}

export const matchContact = async (req, { values }) => {

  const normalized = normalizeValues(values)

  const emails = matchKeys(normalized, /^email/)

  const phones = matchKeys(normalized, /^phone/)

  const addresses = matchKeys(normalized, /^address/)

  const contact = await getContact(req, {
    first_name: normalized.first_name,
    last_name: normalized.last_name,
    emails: emails.length > 0 ? emails : null,
    phones: phones.length > 0 ? phones : null,
    addresses: addresses.length > 0 ? addresses : null
  })

  return contact

}
