import { upload } from '@core/services/aws/s3'
import Raw from '@apps/analytics/models/raw'
import cron from '@core/objects/cron'
import moment from 'moment'

export const processor = async (req) => {

  const raws = await Raw.query(qb => {
    qb.whereRaw('created_at < ?', moment().startOf('day'))
    qb.where('status', 'processed')
  }).fetchAll({
    transacting: req.analytics
  })

  console.log(raws.length)

  if(raws.length === 0) return

  await upload(req, {
    acl: 'private',
    bucket: process.env.AWS_DATA_BUCKET,
    key: `analytics/${moment().format('YYYYMMDD')}.tsv`,
    file_data: raws.map(raw => raw.get('data')).join('\n')
  })

  await req.analytics('raws').where(qb => {
    qb.whereRaw('created_at < ?', moment().startOf('day'))
    qb.where('status', 'processed')
  }).del()

}

const flushRawCron = cron({
  name: 'flush_raw_analytics',
  schedule: '0 1 0 * * *',
  processor
})

export default flushRawCron
