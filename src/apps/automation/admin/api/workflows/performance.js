import Workflow from '@apps/automation/models/workflow'
import moment from 'moment'

const performanceRoute = async (req, res) => {

  const workflow = await Workflow.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  const segments = await req.trx.raw(`
    with filled_dates AS (
    select date
    from generate_series(?::timestamp, ?::timestamp, ?) AS date
    )
    select filled_dates.date, count(crm_workflow_enrollments.*) as count
    from filled_dates
    left join crm_workflow_enrollments on date_trunc(?, timezone(?, created_at::timestamptz)) = filled_dates.date and crm_workflow_enrollments.workflow_id=?
    group by filled_dates.date
    order by filled_dates.date asc
  `, [
    req.query.start,
    req.query.end,
    `1 ${req.query.step}`,
    req.query.step,
    req.query.tz,
    workflow.get('id')
  ]).then(results => results.rows.map(segment => ({
    date: moment(segment.date),
    count: parseInt(segment.count)
  })))

  res.status(200).respond(segments.map(segment => ({
    x: segment.date,
    y: segment.count
  })))

}

export default performanceRoute
