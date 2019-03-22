import { Route } from '../../../server'
import { getIndex } from './utils'

const processor = async (req, trx, options) => {

  const index = await getIndex()

  const content = await new Promise((resolve, reject) => {

    index.get([req.params.id]).on('data', (document) => {

      resolve(document)

    })

  })

  return content

}

const helpRoute = new Route({
  method: 'get',
  path: '/help/:id',
  processor
})

export default helpRoute
