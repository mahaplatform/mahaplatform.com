import ItemSerializer from '../../serializers/item_serializer'
import Item from '../../models/item'
import { ListRoute } from '../../../../core/backframe'

const defaultQuery = (req, trx, qb, options) => {

  qb.leftJoin('drive_folders', 'drive_folders.id', 'drive_items.folder_id')

  qb.whereRaw('drive_items.deleted_at is not null and (drive_items.folder_id is null or drive_folders.deleted_at is null)')

}

const StarredRoute = new ListRoute({
  defaultQuery,
  defaultSort: ['id'],
  model: Item,
  method: 'get',
  path: '/trash',
  serializer: ItemSerializer,
  withRelated: ['asset.source','accesses.access_type','accesses.user.photo','accesses.group','folder']
})

export default StarredRoute
