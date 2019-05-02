import { ListRoute } from 'maha'
import Access from '../../../models/access'
import AccessSerializer from '../../../serializers/access_serializer'

const defaultQuery = (req, trx, qb, options) => {

  qb.where('code', req.params.code)

}

const assignListRoute = new ListRoute({
  defaultQuery,
  defaultSort: ['access_type_id'],
  method: 'get',
  path: '/access',
  model: Access,
  serializer: AccessSerializer,
  withRelated: ['user.photo','group']
})

export default assignListRoute
