import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import EventSerializer from '../../../serializers/event_serializer'
import generateCode from '../../../../../core/utils/generate_code'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Event from '../../../models/event'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'events_events'
  })

  const event = await Event.forge({
    team_id: req.team.get('id'),
    code,
    ...whitelist(req.body, ['title'])
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: event
  })

  await activity(req, {
    story: 'created {object}',
    object: event
  })

  await socket.refresh(req, [
    '/admin/events/events'
  ])

  res.status(200).respond(event, EventSerializer)

}

export default createRoute
