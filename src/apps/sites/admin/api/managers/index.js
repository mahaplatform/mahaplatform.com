import ManagerSerializer from '../../../serializers/manager_serializer'
import Manager from '../../../models/manager'
import { Resources } from 'maha'
import assign from './assign'

const defaultParams = (req, trx, options) => ({
  site_id: req.params.site_id
})

const defaultQuery = (req, trx, qb, options) => {

  qb.where('site_id', req.params.site_id)

}

const managersResources = new Resources({
  allowedParams: ['user_id'],
  collectionActions: [ assign ],
  defaultParams,
  defaultQuery,
  defaultSort: 'id',
  model: Manager,
  only: 'list',
  path: '/sites/:site_id/managers',
  serializer: ManagerSerializer,
  withRelated: ['user.photo']
})

export default managersResources
