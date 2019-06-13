import SupervisorSerializer from '../../../serializers/supervisor_serializer'
import Supervisor from '../../../../maha/models/supervisor'

const showRoute = async (req, res) => {

  const supervisor = await Supervisor.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  if(!supervisor) return req.status(404).respond({
    code: 404,
    message: 'Unable to load supervisor'
  })

  res.status(200).respond(supervisor, (supervisor) => {
    return SupervisorSerializer(req, req.trx, supervisor)
  })

}

export default showRoute
