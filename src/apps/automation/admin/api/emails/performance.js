import Email from '@apps/automation/models/email'
import moment from 'moment'

const performanceRoute = async (req, res) => {

  const email = await Email.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!email) return res.status(404).respond({
    code: 404,
    message: 'Unable to load email'
  })

  const segments = await req.trx.raw(`
    with filled_dates AS (
    select date
    from generate_series(?::timestamp, ?::timestamp, ?) AS date
    )
    select filled_dates.date, count(maha_emails.*) as count
    from filled_dates
    left join maha_emails on date_trunc(?, timezone(?, sent_at::timestamptz)) = filled_dates.date and maha_emails.email_id=?
    group by filled_dates.date
    order by filled_dates.date asc
  `, [
    req.query.start,
    req.query.end,
    `1 ${req.query.step}`,
    req.query.step,
    req.query.tz,
    email.get('id')
  ]).then(results => results.rows.map(segment => ({
    date: moment(segment.date),
    count: parseInt(segment.count)
  })))

  await res.status(200).respond(segments.map(segment => ({
    x: segment.date,
    y: segment.count
  })))

}

export default performanceRoute
