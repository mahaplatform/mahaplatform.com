import Store from '../../../models/store'
import moment from 'moment'

const performanceRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  const orders = await req.trx.raw(`
    with filled_dates AS (
    select date
    from generate_series(?::timestamp, ?::timestamp, ?) AS date
    )
    select filled_dates.date, count(stores_orders.*) as count
    from filled_dates
    left join stores_orders on date_trunc(?, timezone(?, created_at::timestamptz)) = filled_dates.date and stores_orders.store_id=?
    group by filled_dates.date
    order by filled_dates.date asc
  `, [
    req.query.start,
    req.query.end,
    `1 ${req.query.step}`,
    req.query.step,
    req.query.tz,
    store.get('id')
  ]).then(results => results.rows.map(segment => ({
    date: moment(segment.date),
    count: parseInt(segment.count)
  })))

  res.status(200).respond(orders.map(segment => ({
    x: segment.date,
    y: segment.count
  })))

}

export default performanceRoute
