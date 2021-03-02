import ModelQueue from '@analytics/queues/model_queue'
import enrichments from './enrichments'
import Raw from '@analytics/models/raw'
import parseEvent from './event'

const enrich = async (req, job) => {

  const raw = await Raw.query(qb => {
    qb.where('id', job.data.id)
  }).fetch({
    transacting: req.analytics
  })

  try {

    const event = parseEvent(req, {
      data: raw.get('data')
    })

    const enriched = await Promise.reduce(enrichments, async (enriched, enrichment) => {
      return await enrichment(req, enriched, raw)
    }, event)

    await raw.save({
      enriched,
      enrichment_status: 'processed'
    },{
      transacting: req.analytics,
      patch: true
    })

    await ModelQueue.enqueue(req, {
      id: raw.get('id')
    })

  } catch(error) {

    await raw.save({
      enrichment_status: 'failed',
      enrichment_error: error.stack
    },{
      transacting: req.analytics,
      patch: true
    })

  }

}

export default enrich
