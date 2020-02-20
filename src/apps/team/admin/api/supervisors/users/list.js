import UserSerializer from '../../../../serializers/user_serializer'
import Supervisor from '../../../../../maha/models/supervisor'
import User from '../../../../../maha/models/user'

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

  const users = await User.filter({
    scope: (qb) => {
      qb.innerJoin('maha_supervisions', 'maha_supervisions.employee_id', 'maha_users.id')
      qb.where('maha_supervisions.supervisor_id', supervisor.get('user_id'))
      qb.where('maha_users.team_id', req.team.get('id'))
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

  res.status(200).respond(users, (req, user) => ({
    user: UserSerializer(req, user)
  }))

}

export default listRoute
