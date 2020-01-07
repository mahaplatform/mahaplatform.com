import { getClient } from '../../services/mailchimp'

const list = async (req, profile) => {

  const client = getClient(req, profile)

  const result = await client({
    method: 'GET',
    path: '/lists'
  })

  const records = result.lists.map(list => ({
    id: list.id,
    name: list.name,
    contact_count: list.stats.member_count
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
