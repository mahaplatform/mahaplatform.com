import { Resources } from '../../../server'
import ImportItem from '../../../models/import_item'
import ImportItemSerializer from '../../../serializers/import_item_serializer'
import omit from './omit'
import fix from './fix'
import flat from 'flat'

const defaultQuery = (req, trx, qb) => {

  qb.where({ import_id: req.params.import_id })

}

const refresh = (req, trx, result, options) => `/admin/imports/${result.id}`

const importItemResources = new Resources({
  defaultQuery,
  defaultSort: 'id',
  allowedParams: ['values'],
  filterParams:['is_valid','is_omitted','is_nonunique','is_duplicate'],
  model: ImportItem,
  memberActions: [
    omit,
    fix
  ],
  only: ['list','show','edit','update'],
  ownedByTeam: false,
  path: '/imports/:import_id/items',
  refresh: {
    update: refresh
  },
  serializer: ImportItemSerializer
})

export default importItemResources
