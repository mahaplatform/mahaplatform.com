import File from '../../../models/file'
import { destroyFile } from '../../../services/files'

const route = async (req, res) => {

  //TODO: check if locked

  const file = await File.query(qb => {
    qb.where('id', req.item.get('item_id'))
  }).fetch({
    transacting: req.trx
  })

  if(!file) return res.status(404).respond({
    code: 404,
    message: 'Unable to load file'
  })

  await destroyFile(req, file)

  res.status(204).send(null)


}

export default route
