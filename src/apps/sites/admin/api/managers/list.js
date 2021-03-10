import ManagerSerializer from '@apps/sites/serializers/manager_serializer'
import Field from '@apps/maha/models/field'
import Manager from '@apps/sites/models/manager'

const listRoute = async (req, res) => {

  req.fields = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('parent_type', 'sites_sites')
    qb.where('parent_id', req.params.site_id)
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  const managers = await Manager.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('site_id', req.params.site_id)
    },
    filter: {
      params: req.query.$filter
    },
    sort: {
      params: req.query.$sort,
      allowed: ['created_at'],
      defaults: 'created_at'
    },
    page: req.query.$page,
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  await res.status(200).respond(managers, ManagerSerializer)

}

export default listRoute
