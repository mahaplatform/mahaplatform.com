import { getClient } from '../../services/facebook'
import _ from 'lodash'

const list = async (req, profile) => {

  const client = await getClient(req, profile)

  const cursor = _.get(req, 'query.$page.next')

  const query = cursor ? `&after=${cursor}` : ''

  const result = await client.api(`${profile.get('profile_id')}/photos?type=uploaded${query}`, {
    fields: ['id','name','images'],
    limit: 100
  })

  const records = result.data.map((result, index) => ({
    id: result.id,
    name: result.name,
    image: result.images.reduce((found, image) => {
      if(found) return found
      return image.height < 300 ? image.source : null
    }, null)
  }))

  records.pagination = {
    skip: cursor ? 1 : 0,
    next: result.paging ? result.paging.cursors.after : null
  }

  return records

}

export default list
