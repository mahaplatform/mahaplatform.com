import { getClient } from '../../services/constantcontact'

const list = async (req, profile) => {

  const client = await getClient(req, profile)

  return records

}

export default list
