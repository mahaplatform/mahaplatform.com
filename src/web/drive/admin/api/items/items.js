import ItemSerializer from '../../../serializers/item_serializer'
import Folder from '../../../models/folder'
import Item from '../../../models/item'
import { knex, Resources } from 'maha'

export const alterRequest = async (req, trx) => {

  if(!req.query.$filter || !req.query.$filter.code) return req

  if(req.query.$filter.code.$eq === 'drive') {

    req.query.$filter.folder_id = { $eq: 'null' }

  } else {

    const folder = await Folder.where({
      code: req.query.$filter.code.$eq
    }).fetch({ transacting: trx })

    if(folder) req.query.$filter.folder_id = {
      $eq: folder.get('id').toString()
    }

  }

  delete req.query.$filter.code

  return req

}

const defaultQuery = (req, trx, qb, options) => {

  qb.select('drive_items.*','drive_access_types.text as access_type')

  qb.innerJoin('drive_items_access', 'drive_items_access.code', 'drive_items.code')

  qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')

  qb.where('drive_items_access.user_id', req.user.get('id'))

  qb.whereNull('drive_items.deleted_at')

}

const accessTypeFilter = (qb, filter, options) => {

  qb.whereIn('drive_access_types.text', filter.$in)

}
const afterProcessor = async(req, trx, result, options) => {

  const stars = await knex('drive_starred').transacting(trx).where({
    starrer_id: req.user.get('id')
  })

  req.starred = stars.map(star => star.code)

}

const itemResources = new Resources({
  afterProcessor: {
    list: afterProcessor
  },
  alterRequest: {
    list: alterRequest
  },
  defaultQuery,
  defaultSort: ['id'],
  filterParams: ['code','folder_id','type'],
  model: Item,
  only: ['list','show'],
  path: '',
  primaryKey: 'code',
  searchParams: ['label'],
  serializer: ItemSerializer,
  virtualFilters: {
    access_type: accessTypeFilter
  },
  withRelated: ['asset.source','accesses.access_type','accesses.user.photo','accesses.group','folder']
})

export default itemResources
