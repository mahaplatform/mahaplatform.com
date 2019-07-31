import UserSerializer from '../../../serializers/user_serializer'
import User from '../../../models/user'

const employeesRoute = async (req, res) => {

  const users = await User.scope({
    team: req.team
  }).query(qb => {
    qb.innerJoin('maha_supervisions', 'maha_supervisions.employee_id', 'maha_users.id')
    qb.where('maha_supervisions.supervisor_id', req.user.get('id'))
    qb.where('is_active', true)
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

  res.status(200).respond(users, UserSerializer)

}

export default employeesRoute
