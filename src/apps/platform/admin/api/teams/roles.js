import RoleSerializer from '../../../../team/serializers/role_serializer'
import Role from '../../../../maha/models/role'

const rolesRoute = async (req, res) => {

  const roles = await Role.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.params.id)
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
    transacting: req.trx
  })

  res.status(200).respond(roles, RoleSerializer)

}

export default rolesRoute