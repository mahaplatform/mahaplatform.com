import Form from '@apps/forms/models/form'
import moment from 'moment'

const performanceRoute = async (req, res) => {

  const form = await Form.query(qb => {
    qb.select('forms_forms.*','forms_form_totals.*')
    qb.innerJoin('forms_form_totals', 'forms_form_totals.form_id', 'forms_forms.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  const responses = await req.trx.raw(`
    with filled_dates AS (
    select date
    from generate_series(?::timestamp, ?::timestamp, ?) AS date
    )
    select filled_dates.date, count(forms_responses.*) as count
    from filled_dates
    left join forms_responses on date_trunc(?, timezone(?, created_at::timestamptz)) = filled_dates.date and forms_responses.form_id=?
    group by filled_dates.date
    order by filled_dates.date asc
  `, [
    req.query.start,
    req.query.end,
    `1 ${req.query.step}`,
    req.query.step,
    req.query.tz,
    form.get('id')
  ]).then(results => results.rows.map(segment => ({
    date: moment(segment.date),
    count: parseInt(segment.count)
  })))

  res.status(200).respond(responses.map(segment => ({
    x: segment.date,
    y: segment.count
  })))

}

export default performanceRoute
