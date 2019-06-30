import socket from '../../../../../core/services/routes/emitter'
import { createFolder } from '../../../services/folders'
import Folder from '../../../models/folder'

const route = async (req, res) => {

  const parent = await Folder.where(qb => {
    qb.where('fullpath', req.parent_path)
  }).fetch({
    transacting: req.trx
  })

  const folder = await createFolder(req, {
    parent,
    label: req.label
  })

  await socket.refresh(req, [
    `/admin/drive/folders/${folder.related('folder').get('code') || 'drive'}`
  ])

  res.status(200).send(null)

}

export default route
