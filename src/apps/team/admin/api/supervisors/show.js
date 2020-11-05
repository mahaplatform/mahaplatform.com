import SupervisorSerializer from '../../../serializers/supervisor_serializer'
import Supervisor from '@apps/maha/models/supervisor'

const showRoute = async (req, res) => {

  const supervisor = await Supervisor.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  if(!supervisor) return res.status(404).respond({
    code: 404,
    message: 'Unable to load supervisor'
  })

  res.status(200).respond(supervisor, SupervisorSerializer)

}

export default showRoute
