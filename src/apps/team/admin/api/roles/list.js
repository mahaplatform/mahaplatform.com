import RoleSerializer from '@apps/team/serializers/role_serializer'
import Role from '@apps/maha/models/role'

const listRoute = async (req, res) => {

  const roles = await Role.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['title'],
      search: ['title']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'title',
      allowed: ['id','title']
    },
    page: req.query.$page,
    withRelated: ['apps','rights','users.photo'],
    transacting: req.trx
  })

  res.status(200).respond(roles, RoleSerializer)

}

export default listRoute
