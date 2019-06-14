import ItemSerializer from '../../../serializers/item_serializer'
import socket from '../../../../../core/services/routes/emitter'
import { restoreFromTrash } from '../../../services/items'
import Item from '../../../models/item'

const restoreRoute = async (req, res) => {

  const item = await Item.where({
    code: req.params.code
  }).fetch({
    transacting: req.trx
  })

  await restoreFromTrash(item, req.trx)

  await socket.message(req, {
    channel: '/admin/drive',
    action: 'restore_item',
    data: {
      code: req.params.code
    }
  })

  await socket.refresh(req, [
    `/admin/drive/folders/${item.get('folder_id') || 'drive'}`,
    `/admin/drive/files/${item.get('code')}`,
    '/admin/drive/folders/trash'
  ])

  res.status(200).respond(item, (item) => {
    return ItemSerializer(req, item)
  })

}

export default restoreRoute
