import SupervisorSerializer from '@apps/team/serializers/supervisor_serializer'
import Supervisor from '@apps/maha/models/supervisor'

const listRoute = async (req, res) => {

  const supervisors = await Supervisor.filterFetch({
    scope: qb => {
      qb.innerJoin('maha_users', 'maha_users.id', 'maha_supervisors.user_id')
      qb.where('maha_supervisors.team_id', req.team.get('id'))
    },
    aliases: {
      first_name: 'maha_users.first_name',
      last_name: 'maha_users.last_name'
    },
    filter: {
      params: req.query.$filter,
      allowed: ['user_id'],
      search: ['first_name','last_name']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['last_name'],
      allowed: ['last_name']
    },
    page: req.query.$page,
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(supervisors, SupervisorSerializer)

}

export default listRoute
