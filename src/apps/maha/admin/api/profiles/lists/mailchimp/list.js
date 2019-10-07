import { getClient } from '../../services/mailchimp'

const list = async (req, profile) => {

  const client = getClient(req, profile)

  const records = await client({
    method: 'GET',
    path: '/lists'
  })

  return records

}

export default list
