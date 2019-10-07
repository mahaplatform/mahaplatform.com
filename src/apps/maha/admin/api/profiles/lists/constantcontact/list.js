import { getClient } from '../../services/constantcontact'

const list = async (req, profile) => {

  const client = getClient(req, profile)

  const records = await client({
    method: 'GET',
    path: '/contact_lists'
  })

  return records

}

export default list
