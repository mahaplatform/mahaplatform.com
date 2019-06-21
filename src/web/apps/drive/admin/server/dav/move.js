import { renameFolder } from '../../../services/folders'
import { renameFile } from '../../../services/files'
import Folder from '../../../models/folder'
import File from '../../../models/file'

const route = async (req, res) => {

  const label = decodeURI(req.headers.destination).split('/').slice(-1)[0]

  if(req.item.get('type') === 'file') {

    const file = await File.query(qb => {
      qb.where('id', req.item.get('item_id'))
    }).fetch({
      transacting: req.trx
    })

    await renameFile(req, file, { label })

  } else {

    const folder = await Folder.query(qb => {
      qb.where('id', req.item.get('item_id'))
    }).fetch({
      transacting: req.trx
    })

    await renameFolder(req, folder, { label })

  }

  res.status(200).send(null)

}

export default route
