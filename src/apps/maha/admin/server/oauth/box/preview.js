import User from '@apps/maha/models/user'
import { getClient } from './utils'

const preview = async (req, res) => {

  req.user = await User.query(qb => {
    qb.where('id', 79)
  }).fetch({
    transacting: req.trx
  })

  const client = await getClient(req)

  const result = await client.files.getThumbnail(req.query.path, {
    min_width: 160,
    min_height: 160
  })

  res.status(200).type('image/jpeg').end(result.file, 'binary')

}

export default preview
