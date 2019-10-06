import { getClient } from '../../services/mailchimp'

const list = async (req, profile) => {

  const client = await getClient(req, profile)

  return records

}

export default list
