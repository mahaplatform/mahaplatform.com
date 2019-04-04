import ItemSerializer from '../../../serializers/item_serializer'
import Item from '../../../models/item'
import { Resources, Field } from 'maha'
import finalize from './finalize'
import update from './update'
import create from './create'

const alterRequest = async (req, trx) => {

  req.fields = await Field.query(qb => {

    qb.where('parent_type', 'sites_types')

    qb.where('parent_id', req.params.type_id)

    qb.orderBy('delta', 'asc')

  }).fetchAll({ transacting: trx }).then(result => result.toArray())

}

const defaultParams = (req, trx, options) => ({
  site_id: req.params.site_id,
  type_id: req.params.type_id
})

const defaultQuery = (req, trx, qb, options) => {

  qb.where('site_id', req.params.site_id)

  qb.where('type_id', req.params.type_id)

  const title = req.fields[0].get('code')

  const order = req.query.$sort === '-title' ? 'desc' : 'asc'

  qb.orderByRaw(`values->>'${title}' ${order}`)

  if(req.query.$filter && req.query.$filter.q) qb.whereRaw('lower(sites_items.index) like ?', `%${req.query.$filter.q.toLowerCase()}%`)

}

const itemsResources = new Resources({
  alterRequest,
  allowedParams: ['values'],
  collectionActions: [
    create,
    finalize
  ],
  defaultParams,
  defaultQuery,
  defaultSort: '-created_at',
  memberActions: [
    update
  ],
  model: Item,
  except: ['create','update'],
  path: '/sites/:site_id/types/:type_id/items',
  refresh: {
    destroy: (req, trx, result, options) => [
      `/admin/sites/sites/${req.params.site_id}/types/${req.params.type_id}/items`
    ]
  },
  serializer: ItemSerializer
})

export default itemsResources
