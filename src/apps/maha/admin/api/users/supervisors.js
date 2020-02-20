import UserSerializer from '../../../serializers/user_serializer'
import User from '../../../models/user'

const supervisorsRoute = async (req, res) => {

  const users = await User.filterFetch({
    scope: (qb) => {
      qb.innerJoin('maha_supervisors', 'maha_supervisors.user_id', 'maha_users.id')
      qb.where('team_id', req.team.get('id'))
      qb.where('is_active', true)
    },
    filter: {
      params: req.query.$filter,
      allowed: ['first_name','last_name','email']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'last_name'
    },
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  res.status(200).respond(users, UserSerializer)

}

export default supervisorsRoute
