import UserSerializer from '../../../serializers/user_serializer'
import User from '../../../models/user'

const supervisorsRoute = async (req, res) => {

  const users = await User.filter({
    scope: (qb) => {
      qb.innerJoin('maha_supervisors', 'maha_supervisors.user_id', 'maha_users.id')
      qb.where('team_id', req.team.get('id'))
      qb.where('is_active', true)
    },
    filter: req.query.$filter,
    searchParams: ['first_name','last_name','email'],
    sort: req.query.$sort,
    defaultSort: 'last_name'
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  res.status(200).respond(users, UserSerializer)

}

export default supervisorsRoute
