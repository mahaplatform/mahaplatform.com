import SupervisorSerializer from '../../../serializers/supervisor_serializer'
import Supervisor from '../../../../maha/models/supervisor'

const listRoute = async (req, res) => {

  const supervisors = await Supervisor.scope(qb => {
    qb.innerJoin('maha_users', 'maha_users.id', 'maha_supervisors.user_id')
    qb.where('maha_supervisors.team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    filterParams: ['user_id'],
    searchParams: ['maha_users.last_name']
  }).sort({
    sort: req.query.$sort,
    defaultSort: ['maha_users.last_name'],
    sortParams: ['maha_users.last_name']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(supervisors, SupervisorSerializer)

}

export default listRoute
