import SupervisorSerializer from '../../../serializers/supervisor_serializer'
import Supervisor from '../../../../maha/models/supervisor'

const listRoute = async (req, res) => {

  const supervisors = await Supervisor.filterFetch({
    scope: qb => {
      qb.innerJoin('maha_users', 'maha_users.id', 'maha_supervisors.user_id')
      qb.where('maha_supervisors.team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['user_id'],
      search: ['maha_users.last_name']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['maha_users.last_name'],
      allowed: ['maha_users.last_name']
    },
    page: req.query.$page,
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(supervisors, SupervisorSerializer)

}

export default listRoute
