import Email from '../../../models/email'
import moment from 'moment'

const performanceRoute = async (req, res) => {

  const email = await Email.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['email'],
    transacting: req.trx
  })

  if(!email) return res.status(404).respond({
    code: 404,
    message: 'Unable to load email'
  })

  const filled = `
    with filled_dates AS (
    select date
    from generate_series(?::timestamp, ?::timestamp, ?) AS date
    )`

  const params = [
    req.query.start,
    req.query.end,
    `1 ${req.query.step}`,
    req.query.step,
    req.query.tz,
    email.get('id')
  ]

  const data = {}

  data.sent = await req.trx.raw(`
    ${filled}
    select filled_dates.date, count(maha_emails.*) as count
    from filled_dates
    left join maha_emails on date_trunc(?, timezone(?, sent_at::timestamptz)) = filled_dates.date and maha_emails.email_id=?
    group by filled_dates.date
    order by filled_dates.date asc
  `, params).then(results => results.rows.map(segment => ({
    date: moment(segment.date),
    count: parseInt(segment.count)
  })))

  data.delivered = await req.trx.raw(`
    ${filled}
    select filled_dates.date, count(maha_emails.*) as count
    from filled_dates
    left join maha_emails on date_trunc(?, timezone(?, delivered_at::timestamptz)) = filled_dates.date and maha_emails.email_id=?
    group by filled_dates.date
    order by filled_dates.date asc
  `, params).then(results => results.rows.map(segment => ({
    date: moment(segment.date),
    count: parseInt(segment.count)
  })))

  data.opened = await req.trx.raw(`
    ${filled}
    select filled_dates.date, count(maha_emails.*) as count
    from filled_dates
    left join maha_emails on date_trunc(?, timezone(?, opened_at::timestamptz)) = filled_dates.date and maha_emails.email_id=?
    group by filled_dates.date
    order by filled_dates.date asc
  `, params).then(results => results.rows.map(segment => ({
    date: moment(segment.date),
    count: parseInt(segment.count)
  })))

  data.complained = await req.trx.raw(`
    ${filled}
    select filled_dates.date, count(maha_emails.*) as count
    from filled_dates
    left join maha_emails on date_trunc(?, timezone(?, complained_at::timestamptz)) = filled_dates.date and maha_emails.email_id=?
    group by filled_dates.date
    order by filled_dates.date asc
  `, params).then(results => results.rows.map(segment => ({
    date: moment(segment.date),
    count: parseInt(segment.count)
  })))

  data.clicked = await req.trx.raw(`
    ${filled}
    select filled_dates.date, count(maha_emails.*) as count
    from filled_dates
    left join maha_emails on date_trunc(?, timezone(?, clicked_at::timestamptz)) = filled_dates.date and maha_emails.email_id=?
    group by filled_dates.date
    order by filled_dates.date asc
  `, params).then(results => results.rows.map(segment => ({
    date: moment(segment.date),
    count: parseInt(segment.count)
  })))

  const results = {
    metrics: Object.keys(data).reduce((all, key) => ({
      ...all,
      [key]: data[key].reduce((total, segment) => total + segment.count, 0)
    }), {}),
    data: Object.keys(data).reduce((all, key) => ({
      ...all,
      [key]: data[key].map(segment => ({
        x: segment.date,
        y: segment.count
      }))
    }), {})
  }

  const { delivered, opened, clicked } = results.metrics

  results.metrics.open_rate = delivered > 0 ? ((opened / delivered) * 100).toFixed(2) : 0

  results.metrics.click_rate = delivered > 0 ? ((clicked / delivered) * 100).toFixed(2) : 0

  res.status(200).respond(results)

}

export default performanceRoute
