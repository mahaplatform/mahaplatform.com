import EventSerializer from '../../../serializers/event_serializer'
import Event from '../../../models/event'

const listRoute = async (req, res) => {

  const events = await Event.filterFetch({
    scope: (qb) => {
      qb.select(req.trx.raw('events_events.*,events_event_totals.*'))
      qb.innerJoin('events_event_totals','events_event_totals.event_id','events_events.id')
      qb.joinRaw('inner join crm_programs on crm_programs.id=events_events.program_id')
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=events_events.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('events_events.team_id', req.team.get('id'))
      qb.whereNull('events_events.deleted_at')
    },
    aliases: {
      program: 'crm_programs.title',
      registrations_count: 'events_event_totals.registrations_count',
      tickets_count: 'events_event_totals.tickets_count',
      waitings_count: 'events_event_totals.waitings_count',
      revenue: 'events_event_totals.revenue',
      end_date: 'events_event_totals.end_date'
    },
    filter: {
      params: req.query.$filter,
      allowed: ['title'],
      search: ['title']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'title',
      allowed: ['title']
    },
    page: req.query.$page,
    withRelated: ['program.logo'],
    transacting: req.trx
  })

  res.status(200).respond(events, EventSerializer)

}

export default listRoute
