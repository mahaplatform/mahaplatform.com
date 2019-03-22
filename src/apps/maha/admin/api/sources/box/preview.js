import { knex, User } from '../../../../server'
import { getClient } from './utils'

const preview = async (req, res, next) => {

  await knex.transaction(async trx => {

    req.user = await User.where({ id: 79 }).fetch({ transacting: trx })

    const client = await getClient(req, trx)

    const result = await client.files.getThumbnail(req.query.path, {
      min_width: 160,
      min_height: 160
    })

    res.status(200).type('image/jpeg').end(result.file, 'binary')

  })

}

export default preview
