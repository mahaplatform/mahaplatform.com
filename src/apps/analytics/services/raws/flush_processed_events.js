import { upload } from '@core/services/aws/s3'
import Raw from '@apps/analytics/models/raw'
import { gzip } from '@core/services/gzip'
import moment from 'moment'

export const flushProcessedEvents = async (req) => {

  const events = await Raw.query(qb => {
    qb.whereRaw('created_at < ?', moment().startOf('day'))
    qb.where('status', 'processed')
  }).fetchAll({
    transacting: req.analytics
  })

  if(events.length === 0) return

  const records = events.reduce((records, event) => {
    const timestamp = moment(event.get('created_at')).format('YYYYMMDD')
    return {
      ...records,
      [timestamp]: [
        ...records[timestamp] || [],
        event.get('data')
      ]
    }
  }, {})

  await Promise.mapSeries(Object.keys(records), async (timestamp) => {
    await upload(req, {
      acl: 'private',
      bucket: process.env.AWS_DATA_BUCKET,
      key: `analytics/${timestamp}.tsv.gz`,
      file_data: await gzip(records[timestamp].join('\n'))
    })
  })

  await req.analytics('raws').where(qb => {
    qb.whereRaw('created_at < ?', moment().startOf('day'))
    qb.where('status', 'processed')
  }).del()

}
