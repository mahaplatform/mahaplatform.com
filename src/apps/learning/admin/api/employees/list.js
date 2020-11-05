import UserSerializer from '@apps/learning/serializers/user_serializer'
import User from '@apps/maha/models/user'

const listRoute = async (req, res) => {

  const users = await User.filterFetch({
    scope: (qb) => {
      qb.where('maha_users.team_id', req.team.get('id'))
      qb.innerJoin('maha_supervisions', 'maha_supervisions.employee_id', 'maha_users.id')
      qb.where('maha_supervisions.supervisor_id', req.user.get('id'))
    },
    filter: {
      params: req.query.$filter,
      search: ['first_name','last_name','email']
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

export default listRoute
