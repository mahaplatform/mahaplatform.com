import { getClient } from '../../services/google'
import _ from 'lodash'

const list = async (req, profile) => {

  const client = await getClient(req, profile, 'people')

  const pageToken = _.get(req, 'query.$page.next')

  const result = await client.people.connections.list({
    resourceName: 'people/me',
    sortOrder: 'LAST_NAME_ASCENDING',
    personFields: ['names','emailAddresses','phoneNumbers','addresses','photos','organizations'],
    pageToken,
    pageSize: 100
  })

  const records = result.data.connections.filter(contact => {
    return contact.names !== undefined
  }).map(contact => ({
    id: contact.resourceName.replace('people/',''),
    first_name: contact.names ? contact.names[0].givenName || '' : '',
    last_name: contact.names ? contact.names[0].familyName || '' : '',
    photo: contact.photos ? contact.photos[0].url : null,
    organizations: contact.organizations ? contact.organizations.map(organization => ({
      name: organization.name
    })) : [],
    email_addresses: contact.emailAddresses ? contact.emailAddresses.map(address => ({
      is_primary: address.metadata.primary,
      address: address.value
    })) : [],
    phone_numbers: contact.phoneNumbers ? contact.phoneNumbers.map(number => ({
      is_primary: number.metadata.primary,
      number: number.value
    })) : [],
    mailing_addresses: contact.addresses ? contact.addresses.map(address => ({
      is_primary: address.metadata.primary,
      description: address.formattedValue,
      street_1: address.streetAddress,
      city: address.city,
      state_province: address.region,
      postal_code: address.postalCode,
      country: address.countryCode
    })) : []
  }))

  records.pagination = {
    skip: pageToken ? 1 : 0,
    next: result.data.nextPageToken || null
  }

  return records

}

export default list
