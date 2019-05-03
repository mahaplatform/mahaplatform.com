import ItemSerializer from '../../../serializers/item_serializer'
import { moveToTrash } from '../../../services/items'
import Item from '../../../models/item'
import { Route } from '../../../../../core/backframe'

const processor = async (req, trx, options) => {

  const item = await Item.where({
    code: req.params.id
  }).fetch({ transacting: trx })

  await moveToTrash(item, trx)

  return item

}

const refresh = (req, trx, result, options) => [
  `/admin/drive/folders/${result.get('folder_id') || 'drive'}`,
  '/admin/drive/folders/trash'
]

const trashRoute = new Route({
  method: 'patch',
  path: '/:id/trash',
  processor,
  refresh,
  serializer: ItemSerializer
})

export default trashRoute
