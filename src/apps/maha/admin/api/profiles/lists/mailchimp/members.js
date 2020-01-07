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

  const records = result.members.map(contact => ({
    id: contact.id,
    first_name: contact.merge_fields.FNAME,
    last_name: contact.merge_fields.LNAME,
    email_addresses: [
      { address: contact.email_address }
    ],
    phone: contact.merge_fields.PHONE,
    organization: null,
    optedin: contact.status,
    optedin_at: contact.timestamp_opt
  }))

  records.pagination = {
    all: result.total_items,
    limit,
    skip,
    total: result.total_items
  }

  return records

}

export default members
