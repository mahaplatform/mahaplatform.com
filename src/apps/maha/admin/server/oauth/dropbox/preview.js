import User from '@apps/maha/models/user'
import { getClient } from './utils'

const preview = async (req, res) => {

  req.user = await User.query(qb => {
    qb.where('id', 79)
  }).fetch({
    transacting: req.trx
  })

  const client = await getClient(req)

  const result = await client({
    resource: 'files/get_thumbnail_batch',
    parameters: {
      entries: [
        {
          path: req.query.path,
          format: 'jpeg',
          size: 'w128h128',
          mode: 'strict'
        }
      ]
    }
  })

  const data = new Buffer(result.entries[0].thumbnail, 'base64')

  res.status(200).type('image/jpeg').end(data, 'binary')

}

export default preview
