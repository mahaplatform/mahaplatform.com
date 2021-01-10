import { upload } from '@core/services/aws/s3'
import Raw from '@apps/analytics/models/raw'
import moment from 'moment'

export const flushProcessedEvents = async (req) => {

  const events = await Raw.query(qb => {
    qb.whereRaw('created_at < ?', moment().startOf('day'))
    qb.where('status', 'processed')
  }).fetchAll({
    transacting: req.analytics
  })

  if(events.length === 0) return

  await upload(req, {
    acl: 'private',
    bucket: process.env.AWS_DATA_BUCKET,
    key: `analytics/${moment().format('YYYYMMDD')}.tsv`,
    file_data: events.map(event => event.get('data')).join('\n')
  })

  await req.analytics('raws').where(qb => {
    qb.whereRaw('created_at < ?', moment().startOf('day'))
    qb.where('status', 'processed')
  }).del()

}
