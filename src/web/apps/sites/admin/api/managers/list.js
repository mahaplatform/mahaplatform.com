import ManagerSerializer from '../../../serializers/manager_serializer'
import Field from '../../../../maha/models/field'
import Manager from '../../../models/manager'

const listRoute = async (req, res) => {

  req.fields = await Field.scope({
    team: req.team
  }).query(qb => {
    qb.where('parent_type', 'sites_sites')
    qb.where('parent_id', req.params.site_id)
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  const managers = await Manager.scope({
    team: req.team
  }).query(qb => {
    qb.where('site_id', req.params.site_id)
  }).filter({
    filter: req.query.$filter
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'created_at',
    sortParams: ['created_at']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(managers, ManagerSerializer)

}

export default listRoute
