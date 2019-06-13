import UserSerializer from '../../../serializers/user_serializer'
import User from '../../../../maha/models/user'

const availableRoute = async (req, res) => {

  const users = await User.scope({
    team: req.team
  }).query(qb => {
    qb.leftJoin('maha_supervisors', 'maha_supervisors.user_id', 'maha_users.id')
    qb.whereNull('maha_supervisors.id')
  }).filter({
    filter: req.query.$filter,
    searchParams: ['first_name','last_name','email']
  }).sort({
    sort: req.query.$sort,
    defaultSort: ['last_name']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  res.status(200).respond(users, (user) => {
    return UserSerializer(req, req.trx, user)
  })

}

export default availableRoute
