import Queue from '@core/objects/queue'
import moment from 'moment'

export const processor = async (req) => {
  await req.trx('stores_carts').where(qb => {
    qb.whereRaw('updated_at < ?', moment().subtract(24, 'hours'))
    qb.where('status', 'active')
  }).update({
    status: 'abandoned'
  })
}

const expireCartsCron = new Queue({
  queue: 'cron',
  name: 'expire_carts',
  cron: '0 0 * * * *',
  processor
})

export default expireCartsCron
