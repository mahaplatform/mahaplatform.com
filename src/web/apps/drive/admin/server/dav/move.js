import socket from '../../../../../core/services/routes/emitter'
import { renameFolder } from '../../../services/folders'
import { renameFile } from '../../../services/files'
import Folder from '../../../models/folder'
import File from '../../../models/file'
import URL from 'url'

const route = async (req, res) => {

  const { protocol, host } = URL.parse(req.headers.destination)
  const destination = req.headers.destination.replace(`${protocol}//${host}/admin/drive/dav/${req.team.get('subdomain')}/`, '')
  const fullpath = decodeURI(destination).split('/')
  const label = fullpath.slice(-1)[0]
  const parent_path = fullpath.slice(0,-1).join('/')

  const parent = await Folder.where(qb => {
    qb.where('fullpath', parent_path)
  }).fetch({
    transacting: req.trx
  })

  if(req.item.get('type') === 'file') {

    const file = await File.query(qb => {
      qb.where('id', req.item.get('item_id'))
    }).fetch({
      transacting: req.trx
    })

    await renameFile(req, file, {
      label,
      folder_id: parent ? parent.get('id') : null
    })

    await socket.refresh(req, [
      `/admin/drive/folders/${file.related('folder').get('code') ||  'drive'}`
    ])

  } else {

    const folder = await Folder.query(qb => {
      qb.where('id', req.item.get('item_id'))
    }).fetch({
      transacting: req.trx
    })

    await renameFolder(req, folder, {
      label,
      parent_id: parent ? parent.get('id') : null
    })

    await socket.refresh(req, [
      `/admin/drive/folders/${folder.related('folder').get('code') || 'drive'}`
    ])

  }


  res.status(200).send(null)

}

export default route
