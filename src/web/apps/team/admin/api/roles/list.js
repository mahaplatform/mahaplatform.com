import RoleSerializer from '../../../serializers/role_serializer'
import Role from '../../../../maha/models/role'

const listRoute = async (req, res) => {

  const roles = await Role.scope({
    team: req.team
  }).filter({
    filter: req.query.$filter,
    filterParams: ['title'],
    searchParams: ['title']
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'title',
    sortParams: ['id','title']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['apps','rights','users.photo'],
    transacting: req.trx
  })

  res.status(200).respond(roles, (role) => {
    return RoleSerializer(req, role)
  })

}

export default listRoute
