import ItemSerializer from '../../serializers/item_serializer'
import Starred from '../../models/starred'
import { ListRoute } from '../../../../core/backframe'

import Folder from '../../models/folder'

export const alterRequest = async (req, trx) => {

  if(!req.query.$filter || !req.query.$filter.code) return req

  if(req.query.$filter.code.$eq === 'null') {

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

  qb.select('drive_starred.*','drive_access_types.text as access_type')

  qb.innerJoin('drive_items_access', 'drive_items_access.code', 'drive_starred.code')

  qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')

  qb.where('drive_items_access.user_id', req.user.get('id'))

  qb.whereNull('drive_starred.deleted_at')

  qb.where({ starrer_id: req.user.get('id') })

}

const afterProcessor = async(req, trx, result, options) => {

  req.starred = result.records.map(star => star.get('code'))

}

const StarredRoute = new ListRoute({
  afterProcessor,
  alterRequest,
  defaultQuery,
  defaultSort: ['id'],
  filterParams: ['code','folder_id','type'],
  model: Starred,
  method: 'get',
  path: '/starred',
  primaryKey: 'code',
  serializer: ItemSerializer,
  withRelated: ['asset.source','accesses.access_type','accesses.user.photo','accesses.group','folder']
})

export default StarredRoute
