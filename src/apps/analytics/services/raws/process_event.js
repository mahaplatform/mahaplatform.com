import { processMessage } from '@apps/analytics/services/messages'
import Raw from '@apps/analytics/models/raw'

export const processEvent = async(req, { data }) => {

  const raw = await Raw.forge({
    data,
    status: 'pending',
    attempts: 0
  }).save(null, {
    transacting: req.analytics
  })

  try {

    await processMessage(req, {
      message: data
    })

    await raw.save({
      status: 'processed'
    }, {
      transacting: req.analytics,
      patch: true
    })

  } catch(error) {

    await raw.save({
      attempts: parseInt(raw.get('attempts')) + 1,
      status: 'failed',
      error
    }, {
      transacting: req.analytics,
      patch: true
    })

  }

}
