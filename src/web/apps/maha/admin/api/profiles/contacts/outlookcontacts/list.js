import { getClient } from '../../services/microsoft'
import _ from 'lodash'

const list = async (req, profile) => {

  const client = await getClient(req, profile)

  const skiptoken = _.get(req, 'query.$page.next')

  const skip = skiptoken ? `$skiptoken=${skiptoken}` : ''

  const url = `/me/contacts${skip}`

  const result = await client.api(url).get()

  const records = result.value.map(entry => ({
    id: entry.id,
    first_name: entry.givenName,
    last_name: entry.surname,
    photo: `/api/admin/profiles/${profile.get('id')}/contacts/${entry.id}/preview?token=${req.token}`,
    organizations: [
      ...entry.companyName ? [{
        name: entry.companyName
      }] : []
    ],
    email_addresses: entry.emailAddresses.map((address, index) => ({
      is_primary: index === 0,
      address: address.address
    })),
    phone_numbers: [
      ...entry.mobilePhone ? [{
        is_primary: true,
        number: entry.mobilePhone
      }] : [],
      ...entry.businessPhones.map(number => ({
        is_primary: false,
        number: number.number
      }))
    ],
    mailing_addresses: [
      ...entry.homeAddress ? [{
        is_primary: true,
        description: entry.homeAddress.formattedValue,
        street_1: entry.homeAddress.street,
        city: entry.homeAddress.city,
        state_province: entry.homeAddress.state,
        postal_code: entry.homeAddress.postalCode,
        country: entry.homeAddress.countryOrRegion
      }]: []
    ]
  }))

  records.pagination = {
    skip: skiptoken ? 1 : 0,
    next: result['@odata.nextLink'] ? result['@odata.nextLink'].match(/skiptoken=(.*)/)[1] : null
  }

  return records

}

export default list
