import { updateRelated } from '../../../../../core/services/routes/relations'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import EventSerializer from '../../../serializers/event_serializer'
import generateCode from '../../../../../core/utils/generate_code'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import TicketType from '../../../models/ticket_type'
import Session from '../../../models/session'
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
    await Promise.mapSeries(req.body.sessions, async (session) => {
      await Session.forge({
        team_id: req.team.get('id'),
        event_id: event.get('id'),
        ...whitelist(session, ['location_id','is_online','title','date','start_time','end_time'])
      }).save(null, {
        transacting: req.trx
      })
    })
  }

  if(req.body.ticket_types) {
    await Promise.mapSeries(req.body.ticket_types, async (ticket_type) => {
      await TicketType.forge({
        team_id: req.team.get('id'),
        event_id: event.get('id'),
        ...whitelist(ticket_type, ['name','project_id','revenue_type_id','price_type','fixed_price','low_price','high_price','overage_strategy','donation_revenue_type_id','total_tickets','max_per_order','sales_open_at','sales_close_at'])
      }).save(null, {
        transacting: req.trx
      })
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
