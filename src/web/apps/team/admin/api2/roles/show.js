import RoleSerializer from '../../../serializers/role_serializer'
import Role from '../../../../maha/models/role'

const showRoute = async (req, res) => {

  const role = await Role.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['apps','rights','users.photo'],
    transacting: req.trx
  })

  if(!role) return req.status(404).respond({
    code: 404,
    message: 'Unable to load role'
  })

  res.status(200).respond(role, (role) => {
    return RoleSerializer(req, req.trx, role)
  })

}

export default showRoute
