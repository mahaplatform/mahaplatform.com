import Workflow from '../../../models/workflow'
import moment from 'moment'

const performanceRoute = async (req, res) => {

  const workflow = await Workflow.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
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
    workflow.get('id')
  ]

  const data = {}

  data.enrolled = await req.trx.raw(`
    ${filled}
    select filled_dates.date, count(crm_enrollments.*) as count
    from filled_dates
    left join crm_enrollments on date_trunc(?, timezone(?, created_at::timestamptz)) = filled_dates.date and crm_enrollments.workflow_id=?
    group by filled_dates.date
    order by filled_dates.date asc
  `, params).then(results => results.rows.map(segment => ({
    date: moment(segment.date),
    count: parseInt(segment.count)
  })))

  data.active = await req.trx.raw(`
    ${filled}
    select filled_dates.date, count(crm_enrollments.*) as count
    from filled_dates
    left join crm_enrollments on date_trunc(?, timezone(?, created_at::timestamptz)) = filled_dates.date and crm_enrollments.workflow_id=?
    group by filled_dates.date
    order by filled_dates.date asc
  `, params).then(results => results.rows.map(segment => ({
    date: moment(segment.date),
    count: parseInt(segment.count)
  })))

  data.lost = await req.trx.raw(`
    ${filled}
    select filled_dates.date, count(crm_enrollments.*) as count
    from filled_dates
    left join crm_enrollments on date_trunc(?, timezone(?, created_at::timestamptz)) = filled_dates.date and crm_enrollments.workflow_id=?
    group by filled_dates.date
    order by filled_dates.date asc
  `, params).then(results => results.rows.map(segment => ({
    date: moment(segment.date),
    count: parseInt(segment.count)
  })))

  data.completed = await req.trx.raw(`
    ${filled}
    select filled_dates.date, count(crm_enrollments.*) as count
    from filled_dates
    left join crm_enrollments on date_trunc(?, timezone(?, created_at::timestamptz)) = filled_dates.date and crm_enrollments.workflow_id=?
    group by filled_dates.date
    order by filled_dates.date asc
  `, params).then(results => results.rows.map(segment => ({
    date: moment(segment.date),
    count: parseInt(segment.count)
  })))

  data.converted = await req.trx.raw(`
    ${filled}
    select filled_dates.date, count(crm_enrollments.*) as count
    from filled_dates
    left join crm_enrollments on date_trunc(?, timezone(?, created_at::timestamptz)) = filled_dates.date and crm_enrollments.workflow_id=?
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

  const { converted, enrolled } = results.metrics

  results.metrics.conversion_rate = enrolled > 0 ? ((converted / enrolled) * 100).toFixed(2) : 0

  res.status(200).respond(results)

}

export default performanceRoute
