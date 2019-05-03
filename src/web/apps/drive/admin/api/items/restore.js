import ItemSerializer from '../../../serializers/item_serializer'
import Item from '../../../models/item'
import { Route } from '../../../../../core/backframe'
import { restoreFromTrash } from '../../../services/items'

const processor = async (req, trx, options) => {

  const item = await Item.where({
    code: req.params.id
  }).fetch({ transacting: trx })

  await restoreFromTrash(item)

  return item

}

const message = (req, trx, result, options) => ({
  channel: '/admin/drive',
  action: 'restore_item',
  data: {
    code: req.params.id
  }
})

const refresh = (req, trx, result, options) => [
  `/admin/drive/folders/${result.get('folder_id') || 'drive'}`,
  `/admin/drive/files/${result.get('code')}`,
  '/admin/drive/folders/trash'
]

const trashRoute = new Route({
  message,
  method: 'patch',
  path: '/:id/restore',
  processor,
  refresh,
  serializer: ItemSerializer
})

export default trashRoute
