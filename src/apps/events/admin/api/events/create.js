import { createConfirmationWorkflow } from '@apps/automation/services/workflows'
import { updateRelated } from '@core/services/routes/relations'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import EventSerializer from '@apps/events/serializers/event_serializer'
import generateCode from '@core/utils/generate_code'
import { updateTicketTypes } from '@apps/events/services/ticket_types'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import { updateAlias } from '@apps/maha/services/aliases'
import { updateSessions } from '@apps/events/services/sessions'
import Program from '@apps/crm/models/program'
import Event from '@apps/events/models/event'

const createRoute = async (req, res) => {

  const program = await Program.query(qb => {
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.whereIn('crm_program_user_access.type', ['manage','edit'])
    qb.where('crm_programs.team_id', req.team.get('id'))
    qb.where('id', req.body.program_id)
  }).fetch({
    transacting: req.trx
  })

  if(!program) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const code = await generateCode(req, {
    table: 'events_events'
  })

  const event = await Event.forge({
    team_id: req.team.get('id'),
    program_id: program.get('id'),
    code,
    ...whitelist(req.body, ['title','permalink','description','image_id','contact_config','ticket_config','payment_config'])
  }).save(null, {
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

  await updateAlias(req, {
    permalink: req.body.permalink,
    src: `/events/${req.body.permalink}`,
    destination: `/events/${event.get('code')}`
  })

  await audit(req, {
    story: 'created',
    auditable: event
  })

  await createConfirmationWorkflow(req,  {
    event,
    trigger_type: 'registration_created',
    program_id: program.get('id'),
    template_id: req.body.confirmation.template_id,
    sender_id: req.body.confirmation.sender_id,
    subject: req.body.confirmation.subject,
    reply_to: req.body.confirmation.reply_to
  })

  await activity(req, {
    story: 'created {object}',
    object: event
  })

  await socket.refresh(req, [
    '/admin/events/events'
  ])

  await res.status(200).respond(event, EventSerializer)

}

export default createRoute
