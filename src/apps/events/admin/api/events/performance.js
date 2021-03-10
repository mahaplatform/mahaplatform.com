import Event from '@apps/events/models/event'
import moment from 'moment'

const performanceRoute = async (req, res) => {

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

  const registrations = await req.trx.raw(`
    with filled_dates AS (
    select date
    from generate_series(?::timestamp, ?::timestamp, ?) AS date
    )
    select filled_dates.date, count(events_registrations.*) as count
    from filled_dates
    left join events_registrations on date_trunc(?, timezone(?, created_at::timestamptz)) = filled_dates.date and events_registrations.event_id=?
    group by filled_dates.date
    order by filled_dates.date asc
  `, [
    req.query.start,
    req.query.end,
    `1 ${req.query.step}`,
    req.query.step,
    req.query.tz,
    event.get('id')
  ]).then(results => results.rows.map(segment => ({
    date: moment(segment.date),
    count: parseInt(segment.count)
  })))

  await res.status(200).respond(registrations.map(segment => ({
    x: segment.date,
    y: segment.count
  })))

}

export default performanceRoute
