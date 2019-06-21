import { createFolder } from '../../../services/folders'
import Folder from '../../../models/folder'

const route = async (req, res) => {

  const requestURI = req.originalUrl.replace('/admin/drive/maha', '')
  const slashfree = requestURI.replace(/\/+$/, '').replace(/^\/+/, '')
  const parent_path = decodeURI(slashfree).split('/')

  const folder = await Folder.where(qb => {
    qb.where('fullpath', parent_path.slice(0,-1).join('/'))
  }).fetch({
    transacting: req.trx
  })

  await createFolder(req, {
    parent_id: folder ? folder.get('id') : null,
    label: parent_path.slice(-1)[0]
  })

  res.status(200).send(null)

}

export default route
