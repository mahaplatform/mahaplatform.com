import { getClient } from '../../services/twitter'

const list = async (req, profile) => {

  const client = await getClient(req, profile)

  const result = await client('get', 'statuses/user_timeline')

  const records = result.map(result => ({
    ...result
    // id: result.id,
    // attachments: result.attachments,
    // link: result.link,
    // message: result.message
  }))

  records.pagination = {
    skip: 0,
    next: null
  }

  return records

}

export default list
