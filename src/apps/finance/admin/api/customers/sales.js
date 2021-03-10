import Customer from '@apps/finance/models/customer'
import moment from 'moment'

const salesRoute = async (req, res) => {

  const customer = await Customer.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.customer_id)
  }).fetch({
    transacting: req.trx
  })

  if(!customer) return res.status(404).respond({
    code: 404,
    message: 'Unable to load customer'
  })

  const filled = `
    filled_dates AS (
    select date
    from generate_series(?::timestamp, ?::timestamp, ?) AS date
    )`

  const payments = `
    payments AS (
    select finance_payments.amount,finance_invoices.customer_id,finance_payments.created_at
    from finance_payments
    inner join finance_invoices on finance_invoices.id=finance_payments.invoice_id
    )`

  const params = [
    req.query.start,
    req.query.end,
    `1 ${req.query.step}`,
    req.query.step,
    req.query.tz,
    customer.get('id')
  ]

  const data = {}

  data.revenue = await req.trx.raw(`
    with ${filled}, ${payments}
    select filled_dates.date, sum(payments.amount) as amount
    from filled_dates
    left join payments on date_trunc(?, timezone(?, payments.created_at::timestamptz)) = filled_dates.date and payments.customer_id=?
    group by filled_dates.date
    order by filled_dates.date asc
  `, params).then(results => results.rows.map(segment => ({
    date: moment(segment.date),
    value: Number(segment.amount)
  })))

  data.transactions = await req.trx.raw(`
    with ${filled}, ${payments}
    select filled_dates.date, count(payments.*) as count
    from filled_dates
    left join payments on date_trunc(?, timezone(?, payments.created_at::timestamptz)) = filled_dates.date and payments.customer_id=?
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

  await res.status(200).respond(results)

}

export default salesRoute
