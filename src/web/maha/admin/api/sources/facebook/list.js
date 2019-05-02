import { Route } from '../../../../server'
import { getClient } from './utils'
import _ from 'lodash'

const processor = async (req, trx, options) => {

  const client = await getClient(req, trx)

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

  return {
    records,
    skip: cursor ? 1 : 0,
    next: result.paging ? result.paging.cursors.after : null
  }

}

const listRoute = new Route({
  method: 'get',
  path: '/facebook/photos',
  processor
})

export default listRoute
