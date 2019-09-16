import { getClient } from '../../services/instagram'
import _ from 'lodash'

const listRoute = async (req, profile) => {

  const client = await getClient(req, profile)

  const max_id = _.get(req, 'query.$page.next')

  const config = max_id ? { max_id } : {}

  const result = await Promise.promisify(client.user_self_media_recent)(config)

  const records = result.map(result => ({
    id: result.id,
    caption: result.caption ? result.caption.text : null,
    thumbnail: result.images.thumbnail.url,
    image: result.images.standard_resolution.url
  }))

  const next = records.length > 0 ? records[records.length - 1].id : null

  records.pagination = {
    skip: max_id ? 1 : 0,
    next
  }

  return records

}

export default listRoute
