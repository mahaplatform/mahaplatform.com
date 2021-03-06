import socket from '@core/services/routes/emitter'
import { createFolder } from '@apps/drive/services/folders'
import Folder from '@apps/drive/models/folder'

const mkcolRoute = async (req, res) => {

  const parent = await Folder.query(qb => {
    qb.where('team_id', req.team.get('id'))
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
