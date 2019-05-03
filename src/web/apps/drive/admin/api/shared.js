import ItemSerializer from '../../serializers/item_serializer'
import Item from '../../models/item'
import knex from '../../../../core/services/knex'
import { ListRoute } from '../../../../core/backframe'

const defaultQuery = (req, trx, qb, options) => {

  qb.select('drive_items.*','drive_access_types.text as access_type')

  qb.innerJoin('drive_items_access', 'drive_items_access.code', 'drive_items.code')

  qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')

  qb.where('drive_items_access.user_id', req.user.get('id'))

  qb.where({ type: 'file' })

  qb.whereNot('drive_access_types.text', 'owner')

  qb.whereNull('drive_items.deleted_at')

}

const afterProcessor = async(req, trx, result, options) => {

  const stars = await knex('drive_starred').transacting(trx).where({
    starrer_id: req.user.get('id')
  })

  req.starred = stars.map(star => star.code)

}

const StarredRoute = new ListRoute({
  afterProcessor,
  defaultQuery,
  defaultSort: ['id'],
  model: Item,
  method: 'get',
  path: '/shared',
  primaryKey: 'code',
  serializer: ItemSerializer,
  withRelated: ['asset.source','accesses.access_type','accesses.user.photo','accesses.group','folder']
})

export default StarredRoute
