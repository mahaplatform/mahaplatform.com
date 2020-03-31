import { updateRelated } from '../../../../../core/services/routes/relations'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import EventSerializer from '../../../serializers/event_serializer'
import generateCode from '../../../../../core/utils/generate_code'
import { updateTicketTypes } from '../../../services/ticket_types'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import { updateSessions } from '../../../services/sessions'
import Event from '../../../models/event'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'events_events'
  })

  const event = await Event.forge({
    team_id: req.team.get('id'),
    program_id: req.body.program_id,
    code,
    ...whitelist(req.body, ['title','description','image_id'])
  }).save(null, {
    transacting: req.trx
  })

  if(req.body.sessions) {
    await updateSessions(req, {
      sessions: req.body.sessions
    })
  }

  if(req.body.ticket_types) {
    await updateTicketTypes(req, {
      ticket_types: req.body.ticket_types
    })
  }

  if(req.body.organizer_ids) {
    await updateRelated(req, {
      object: event,
      related: 'organizers',
      table: 'events_events_organizers',
      ids: req.body.organizer_ids,
      foreign_key: 'event_id',
      related_foreign_key: 'organizer_id'
    })
  }

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
