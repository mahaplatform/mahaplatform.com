import { processMessage } from '@apps/analytics/services/messages'
import Raw from '@apps/analytics/models/raw'

export const processEvent = async(req, { data }) => {

  const raw = await Raw.forge({
    data,
    status: 'pending'
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

  } catch(e) {

    await raw.save({
      status: 'failed'
    }, {
      transacting: req.analytics,
      patch: true
    })

  }

}
