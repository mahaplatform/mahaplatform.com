import ItemSerializer from '../../../serializers/item_serializer'
import socket from '../../../../../core/services/routes/emitter'
import { restoreFromTrash } from '../../../services/items'
import Item from '../../../models/item'

const restoreRoute = async (req, res) => {

  const item = await Item.where({
    code: req.params.code
  }).fetch({
    withRelated: ['folder'],
    transacting: req.trx
  })

  await restoreFromTrash(req, item)

  await socket.message(req, {
    channel: '/admin/drive',
    action: 'restore_item',
    data: {
      code: req.params.code
    }
  })

  await socket.refresh(req, [
    `/admin/drive/folders/${item.related('folder') ? item.related('folder').get('code') : 'drive'}`,
    `/admin/drive/files/${item.get('code')}`,
    '/admin/drive/folders/trash'
  ])

  res.status(200).respond(item, ItemSerializer)

}

export default restoreRoute
