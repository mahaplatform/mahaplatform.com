import { getClient } from '../../services/google'
import moment from 'moment'
import _ from 'lodash'

const list = async (req, profile) => {

  const client = await getClient(req, profile, 'people')

  const pageToken = _.get(req, 'query.$page.next')

  const result = await client.people.connections.list({
    resourceName: 'people/me',
    sortOrder: 'LAST_NAME_ASCENDING',
    personFields: ['names','emailAddresses','phoneNumbers','addresses','photos','organizations','relations','birthdays'],
    pageToken,
    pageSize: 100
  })

  const records = result.data.connections ? result.data.connections.filter(contact => {
    return contact.names !== undefined
  }).map(contact => ({
    first_name: contact.names ? contact.names[0].givenName || '' : '',
    last_name: contact.names ? contact.names[0].familyName || '' : '',
    photo: contact.photos ? contact.photos[0].url : null,
    organization: contact.organizations ? contact.organizations[0].name : '',
    position: contact.organizations ? contact.organizations[0].title : '',
    birthday: contact.birthdays ? moment(contact.birthdays[0].text).format('YYYY-MM-DD') : '',
    spouse: contact.relations ? contact.relations.find(relation => relation.type === 'spouse').person : '',
    email_addresses: contact.emailAddresses ? contact.emailAddresses.map(address => ({
      address: address.value
    })) : [],
    phone_numbers: contact.phoneNumbers ? contact.phoneNumbers.map(number => ({
      number: number.value
    })) : [],
    mailing_addresses: contact.addresses ? contact.addresses.map(address => ({
      street_1: address.streetAddress,
      city: address.city,
      state_province: address.region,
      postal_code: address.postalCode
    })) : []
  })) : []

  records.pagination = {
    skip: pageToken ? 1 : 0,
    next: result.data.nextPageToken || null
  }

  return records

}

export default list
