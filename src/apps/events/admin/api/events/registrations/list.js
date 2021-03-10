import RegistrationSerializer from '@apps/events/serializers/registration_serializer'
import Registration from '@apps/events/models/registration'
import Event from '@apps/events/models/event'

const listRoute = async (req, res) => {

  const event = await Event.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.event_id)
  }).fetch({
    transacting: req.trx
  })

  if(!event) return res.status(404).respond({
    code: 404,
    message: 'Unable to load event'
  })

  const registrations = await Registration.filterFetch({
    scope: (qb) => {
      qb.select('events_registrations.*','events_registration_totals.*','events_registration_ticket_type_totals.ticket_type_totals','events_registration_tokens.tokens')
      qb.innerJoin('events_registration_totals','events_registration_totals.registration_id','events_registrations.id')
      qb.innerJoin('events_registration_ticket_type_totals','events_registration_ticket_type_totals.registration_id','events_registrations.id')
      qb.innerJoin('events_registration_tokens','events_registration_tokens.registration_id','events_registrations.id')
      qb.where('events_registrations.team_id', req.team.get('id'))
      qb.where('events_registrations.event_id', event.get('id'))
    },
    aliases: {
      first_name: 'crm_contacts.first_name',
      last_name: 'crm_contacts.last_name',
      contact: 'crm_contacts.last_name',
      revenue: 'events_registration_totals.revenue',
      tickets_count: 'events_registration_totals.tickets_count'
    },
    filter: {
      params: req.query.$filter,
      allowed: ['title'],
      search: ['first_name','last_name']
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['contact','payment'],
    transacting: req.trx
  })

  await res.status(200).respond(registrations, RegistrationSerializer)

}

export default listRoute
