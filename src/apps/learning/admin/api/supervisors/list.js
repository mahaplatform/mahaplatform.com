import UserSerializer from '@apps/maha/serializers/user_serializer'
import User from '@apps/maha/models/user'

const listRoute = async (req, res) => {

  const users = await User.filterFetch({
    scope: (qb) => {
      qb.innerJoin('maha_supervisions', 'supervisor_id', 'id')
      qb.whereRaw('maha_supervisions.employee_id=?', req.user.get('id'))
      qb.where('maha_users.team_id', req.team.get('id'))
    },
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  res.status(200).respond(users, UserSerializer)

}

export default listRoute
