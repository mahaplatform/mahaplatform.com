import socket from '../../../../../core/services/routes/emitter'
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

    await socket.refresh(req, [
      `/admin/drive/folders/${file.related('folder').get('code') ||  'drive'}`
    ])

  } else {

    const folder = await Folder.query(qb => {
      qb.where('id', req.item.get('item_id'))
    }).fetch({
      transacting: req.trx
    })

    await renameFolder(req, folder, { label })

    await socket.refresh(req, [
      `/admin/drive/folders/${folder.related('folder').get('code') || 'drive'}`
    ])

  }


  res.status(200).send(null)

}

export default route
