import RoleSerializer from '../../../serializers/role_serializer'
import Role from '../../../../maha/models/role'

const listRoute = async (req, res) => {

  const roles = await Role.filter({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: req.query.$filter,
    filterParams: ['title'],
    searchParams: ['title'],
    sort: req.query.$sort,
    defaultSort: 'title',
    sortParams: ['id','title']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['apps','rights','users.photo'],
    transacting: req.trx
  })

  res.status(200).respond(roles, RoleSerializer)

}

export default listRoute
