import SupervisorSerializer from '../../../serializers/supervisor_serializer'
import Supervisor from '../../../../maha/models/supervisor'

const showRoute = async (req, res) => {

  const supervisor = await Supervisor.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', id)
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
