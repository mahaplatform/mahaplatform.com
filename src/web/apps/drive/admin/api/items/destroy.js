import socket from '../../../../../core/services/routes/emitter'
import { deleteForever } from '../../../services/items'
import Item from '../../../models/item'

const destroyRoute = async (req, res) => {

  const item = await Item.where({
    code: req.params.code
  }).fetch({
    withRelated: ['folder'],
    transacting: req.trx
  })

  const channels = [
    `/admin/drive/folders/${item.related('folder') ? item.related('folder').get('code') : 'drive'}`,
    `/admin/drive/folders/${item.get('folder_id') || 'drive'}`,
    '/admin/drive/folders/trash'
  ]

  await deleteForever(req, item)

  await socket.refresh(req, channels)

  res.status(200).respond(true)

}

export default destroyRoute
