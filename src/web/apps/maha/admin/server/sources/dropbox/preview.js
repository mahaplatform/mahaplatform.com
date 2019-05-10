import knex from '../../../../../../core/services/knex'
import User from '../../../../models/user'
import { getClient } from './utils'

const preview = async (req, res, next) => {

  await knex.transaction(async trx => {

    req.user = await User.where({ id: 79 }).fetch({ transacting: trx })

    const client = await getClient(req, trx)

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

  })

}

export default preview
