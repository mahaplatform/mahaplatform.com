import UserSerializer from '../../../../serializers/user_serializer'
import User from '../../../../../maha/models/user'

const listRoute = async (req, res) => {

  const users = await User.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.innerJoin('maha_users_roles', 'maha_users_roles.user_id', 'maha_users.id')
    qb.where('maha_users_roles.role_id', req.params.id)
  }).filter({
    filter: req.query.$filter,
    searchParams: ['first_name','last_name','email']
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'last_name'
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  res.status(200).respond(users, (user) => ({
    user: UserSerializer(req, req.trx, user)
  }))

}

export default listRoute
