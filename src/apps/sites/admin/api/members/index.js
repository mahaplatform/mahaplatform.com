import MemberSerializer from '../../../serializers/member_serializer'
import Member from '../../../models/member'
import { Resources, Field } from 'maha'
import create from './create'

const alterRequest = async (req, trx) => {

  req.fields = await Field.query(qb => {

    qb.where('parent_type', 'sites_sites')

    qb.where('parent_id', req.params.site_id)

    qb.orderBy('delta', 'asc')

  }).fetchAll({ transacting: trx }).then(result => result.toArray())

}

const defaultParams = (req, trx, options) => ({
  site_id: req.params.site_id
})

const defaultQuery = (req, trx, qb, options) => {

  qb.where('site_id', req.params.site_id)

}

const refresh = {
  update: (req, trx, result, options) => [
    `/admin/sites/sites/${result.get('site_id')}/members`,
    `/admin/sites/sites/${result.get('site_id')}/members/${result.get('id')}`
  ]
}

const membersResources = new Resources({
  allowedParams: ['first_name','last_name','email'],
  alterRequest,
  collectionActions: [
    create
  ],
  defaultParams,
  defaultQuery,
  except: ['create'],
  model: Member,
  path: '/sites/:site_id/members',
  refresh,
  serializer: MemberSerializer,
  sortParams: ['last_name']
})

export default membersResources
