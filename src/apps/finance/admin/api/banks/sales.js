import Bank from '../../../models/bank'
import moment from 'moment'

const salesRoute = async (req, res) => {

  const bank = await Bank.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.bank_id)
  }).fetch({
    transacting: req.trx
  })

  if(!bank) return res.status(404).respond({
    code: 404,
    message: 'Unable to load bank'
  })

  const filled = `
    filled_dates AS (
    select date
    from generate_series(?::timestamp, ?::timestamp, ?) AS date
    )`

  const params = [
    req.query.start,
    req.query.end,
    `1 ${req.query.step}`,
    req.query.step,
    req.query.tz,
    bank.get('id')
  ]

  const data = {}

  data.revenue = await req.trx.raw(`
    with ${filled}
    select filled_dates.date, sum(finance_payments.amount) as amount
    from filled_dates
    left join finance_payments on date_trunc(?, timezone(?, finance_payments.created_at::timestamptz)) = filled_dates.date and finance_payments.bank_id=?
    group by filled_dates.date
    order by filled_dates.date asc
  `, params).then(results => results.rows.map(segment => ({
    date: moment(segment.date),
    value: Number(segment.amount)
  })))

  data.transactions = await req.trx.raw(`
    with ${filled}
    select filled_dates.date, count(finance_payments.*) as count
    from filled_dates
    left join finance_payments on date_trunc(?, timezone(?, finance_payments.created_at::timestamptz)) = filled_dates.date and finance_payments.bank_id=?
    group by filled_dates.date
    order by filled_dates.date asc
  `, params).then(results => results.rows.map(segment => ({
    date: moment(segment.date),
    value: Number(segment.count)
  })))

  const results = {
    metrics: {},
    data: Object.keys(data).reduce((all, key) => ({
      ...all,
      [key]: data[key].map(segment => ({
        x: segment.date,
        y: segment.value
      }))
    }), {})
  }

  results.metrics.revenue = data.revenue.reduce((total, segment) => total + segment.value, 0.00)
  results.metrics.transactions = data.transactions.reduce((total, segment) => total + segment.value, 0)
  results.metrics.average = results.metrics.revenue / results.metrics.transactions

  res.status(200).respond(results)

}

export default salesRoute
