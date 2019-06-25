import UserSerializer from '../../../../maha/serializers/user_serializer'
import User from '../../../../maha/models/user'

const listRoute = async (req, res) => {

  const users = await User.scope({
    team: req.team
  }).query(qb => {
    qb.innerJoin('maha_supervisions', 'supervisor_id', 'id')
    qb.whereRaw('maha_supervisions.employee_id=?', req.user.get('id'))
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  res.status(200).respond(users, UserSerializer)

}

export default listRoute
