import { processMessage } from '@apps/analytics/services/messages'
import Raw from '@apps/analytics/models/raw'

export const reprocessFailedEvents = async (req) => {

  const events = await Raw.query(qb => {
    qb.where('status', 'failed')
  }).fetchAll({
    transacting: req.analytics
  })

  if(events.length === 0) return

  await Promise.mapSeries(events, async(event) => {

    try {

      await processMessage(req, {
        message: event.get('data')
      })

      await event.save({
        status: 'processed'
      }, {
        transacting: req.analytics,
        patch: true
      })

    } catch(e) {

      await event.save({
        status: 'failed'
      }, {
        transacting: req.analytics,
        patch: true
      })

    }

  })

}
