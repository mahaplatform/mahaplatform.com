import UserSerializer from '../../../../serializers/user_serializer'
import Supervisor from '@apps/maha/models/supervisor'
import User from '@apps/maha/models/user'

const listRoute = async (req, res) => {

  const supervisor = await Supervisor.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!supervisor) return res.status(404).respond({
    code: 404,
    message: 'Unable to load supervisor'
  })

  const users = await User.filterFetch({
    scope: (qb) => {
      qb.innerJoin('maha_supervisions', 'maha_supervisions.employee_id', 'maha_users.id')
      qb.where('maha_supervisions.supervisor_id', supervisor.get('user_id'))
      qb.where('maha_users.team_id', req.team.get('id'))
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

  res.status(200).respond(users, (req, user) => ({
    user: UserSerializer(req, user)
  }))

}

export default listRoute
