import { getClient } from '../../services/mailchimp'
import _ from 'lodash'

const members = async (req, profile) => {

  const client = getClient(req, profile)

  const skip = _.get(req, 'query.$page.skip') || 0

  const limit = _.get(req, 'query.$page.limit') || 100

  const result = await client({
    method: 'GET',
    path: `/lists/${req.params.id}/members`,
    query: {
      offset: skip,
      count: limit
    }
  })

  const records = result.members.filter(contact => {
    return contact.status === 'subscribed'
  }).map(contact => ({
    first_name: contact.merge_fields.FNAME,
    last_name: contact.merge_fields.LNAME,
    mailing_addresses: contact.merge_fields.ADDRESS.addr1 ? [
      {
        street_1: contact.merge_fields.ADDRESS.addr1,
        street_2: contact.merge_fields.ADDRESS.addr2,
        city: contact.merge_fields.ADDRESS.city,
        state_province: contact.merge_fields.ADDRESS.state,
        postal_code: contact.merge_fields.ADDRESS.zip
      }
    ] : [],
    email_addresses: [
      { address: contact.email_address }
    ],
    phone_numbers: contact.merge_fields.PHONE ? [
      { number: contact.merge_fields.PHONE }
    ] : [],
    organizations: []
  }))

  records.pagination = {
    all: result.total_items,
    limit,
    skip: parseInt(skip),
    total: result.total_items
  }

  return records

}

export default members
