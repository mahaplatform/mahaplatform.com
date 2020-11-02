import { getClient } from '../../services/constantcontact'
import moment from 'moment'
import _ from 'lodash'

const members = async (req, profile) => {

  const client = getClient(req, profile)

  const cursor = _.get(req, 'query.$page.next')

  const result = await client({
    method: 'GET',
    path: '/contacts',
    query: {
      include: 'phone_numbers,street_addresses',
      cursor,
      lists: req.params.id,
      limit: 100,
      include_count: true
    }
  })

  const records = result.contacts.filter(contact => {
    return contact.email_address.permission_to_send
  }).map(contact => ({
    first_name: contact.first_name,
    last_name: contact.last_name,
    organization: contact.company_name,
    position: contact.job_title,
    birthday: contact.birthday_day ? moment(`2020-${contact.birthday_month}-${contact.birthday_day}`).fomat('YYYY-MM-DD') : '',
    email_addresses: [
      { address: contact.email_address.address }
    ],
    mailing_addresses: contact.street_addresses ? contact.street_addresses.map(address => ({
      street_1: address.street,
      city: address.city,
      state_province: address.state,
      postal_code: address.postal_code
    })) : [],
    phone_numbers: contact.phone_numbers ? contact.phone_numbers.map(number => ({
      number: number.phone_number
    })) : []
  }))

  const next = _.get(result, '_links.next.href')

  records.pagination = {
    skip: cursor ? 1 : 0,
    next: next ? next.replace('/v3/contacts?cursor=','') : null
  }

  return records

}

export default members
