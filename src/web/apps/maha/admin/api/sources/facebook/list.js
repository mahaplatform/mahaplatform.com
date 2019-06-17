import { getClient } from './utils'
import _ from 'lodash'

const listRoute = async (req, res) => {

  const client = await getClient(req, req.trx)

  const cursor = _.get(req, 'query.$page.next')

  const query = cursor ? `&after=${cursor}` : ''

  const result = await client.api(`me/photos?type=uploaded${query}`, {
    fields: ['id','name','images'],
    limit: 100
  })

  const records = result.data.map(result => ({
    id: result.id,
    name: result.name,
    image: result.images.reduce((found, image) => {
      if(found) return found
      return image.height === 225 ? image.source : null
    }, null)
  }))

  records.pagination = {
    skip: cursor ? 1 : 0,
    next: result.paging ? result.paging.cursors.after : null
  }

  res.status(200).respond(records)

}

export default listRoute
