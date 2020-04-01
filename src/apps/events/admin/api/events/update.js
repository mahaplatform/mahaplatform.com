import { updateRelated } from '../../../../../core/services/routes/relations'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import EventSerializer from '../../../serializers/event_serializer'
import { updateTicketTypes } from '../../../services/ticket_types'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import { updateSessions } from '../../../services/sessions'
import Event from '../../../models/event'

const updateRoute = async (req, res) => {

  const event = await Event.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!event) return res.status(404).respond({
    code: 404,
    message: 'Unable to load event'
  })

  await event.save({
    ...whitelist(req.body, ['title','description','image_id'])
  }, {
    transacting: req.trx
  })

  if(req.body.sessions) {
    await updateSessions(req, {
      event,
      sessions: req.body.sessions
    })
  }

  if(req.body.ticket_types) {
    await updateTicketTypes(req, {
      event,
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
    story: 'updated',
    auditable: event
  })

  await activity(req, {
    story: 'updated {object}',
    object: event
  })

  await socket.refresh(req, [
    '/admin/events/events',
    `/admin/events/events/${event.get('id')}`
  ])

  res.status(200).respond(event, EventSerializer)

}

export default updateRoute
