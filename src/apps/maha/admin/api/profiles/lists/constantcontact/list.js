import { getClient } from '../../services/constantcontact'

const list = async (req, profile) => {

  const client = getClient(req, profile)

  const result = await client({
    method: 'GET',
    path: '/contact_lists',
    query: {
      include_count: true
    }
  })

  const records = result.lists.map(list => ({
    id: list.list_id,
    name: list.name,
    contact_count: list.membership_count
  }))

  records.pagination = {
    all: result.lists.length,
    limit: 100,
    skip: 0,
    total: result.lists.length
  }

  return records

}

export default list
