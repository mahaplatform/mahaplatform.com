import { getClient } from '../../services/constantcontact'
import _ from 'lodash'

const members = async (req, profile) => {

  const client = getClient(req, profile)

  const cursor = _.get(req, 'query.$page.next')

  const result = await client({
    method: 'GET',
    path: '/contacts',
    query: {
      cursor,
      lists: req.params.id,
      limit: 100,
      include_count: true
    }
  })

  const records = result.contacts.map(contact => ({
    id: contact.contact_id,
    first_name: contact.first_name,
    last_name: contact.last_name,
    email_addresses: [
      { address: contact.email_address.address }
    ],
    phone: null,
    organization: contact.company_name,
    optedin: contact.email_address.permission_to_send,
    optedin_at: contact.email_address.opt_in_date
  }))

  const next = _.get(result, '_links.next.href')

  records.pagination = {
    skip: cursor ? 1 : 0,
    next: next ? next.replace('/v3/contacts?cursor=','') : null
  }

  return records

}

export default members
