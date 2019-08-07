import socket from '../../../core/services/routes/emitter'
import { createFolder } from '../services/folders'
import Folder from '../models/folder'

const mkcolRoute = async (req, res) => {

  const parent = await Folder.scope({
    team: req.team
  }).where(qb => {
    qb.where('fullpath', req.parent_path)
    qb.whereNull('deleted_at')
  }).fetch({
    transacting: req.trx
  })

  await createFolder(req, {
    parent,
    label: req.label
  })

  await socket.refresh(req, [
    `/admin/drive/folders/${parent ? parent.get('code') : 'drive'}`
  ])

  res.status(200).send(null)

}

export default mkcolRoute
