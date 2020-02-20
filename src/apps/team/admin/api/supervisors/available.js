import UserSerializer from '../../../serializers/user_serializer'
import User from '../../../../maha/models/user'

const availableRoute = async (req, res) => {

  const users = await User.filter({
    scope: (qb) => {
      qb.leftJoin('maha_supervisors', 'maha_supervisors.user_id', 'maha_users.id')
      qb.where('maha_users.team_id', req.team.get('id'))
      qb.whereNull('maha_supervisors.id')
    },
    filter: req.query.$filter,
    searchParams: ['first_name','last_name','email'],
    sort: req.query.$sort,
    defaultSort: ['last_name']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  res.status(200).respond(users, UserSerializer)

}

export default availableRoute
