import SupervisorSerializer from '../../../serializers/supervisor_serializer'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'
import Supervisor from '../../../../maha/models/supervisor'

const createRoute = async (req, res) => {

  const supervisor = await Supervisor.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['user_id'])
  }).save(null, {
    transacting: req.trx
  })

  await supervisor.load('user', {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: supervisor
  })

  await socket.refresh(req, [
    '/admin/team/supervisors'
  ])

  res.status(200).respond(supervisor, SupervisorSerializer)

}

export default createRoute
