import { destroyFolder } from '../../../services/folders'
import { destroyFile } from '../../../services/files'
import Folder from '../../../models/folder'
import File from '../../../models/file'

const route = async (req, res) => {

  if(req.item.get('type') === 'folder') {

    const folder = await Folder.query(qb => {
      qb.where('id', req.item.get('item_id'))
    }).fetch({
      transacting: req.trx
    })

    if(!folder) return res.status(404).respond({
      code: 404,
      message: 'Unable to load folder'
    })

    await destroyFolder(req, folder)

  } else {

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

  }

  res.status(204).send(null)


}

export default route
