import EnrichQueue from '@apps/analytics/queues/enrich_queue'
import validations from './validations'
import Raw from '@apps/analytics/models/raw'

const validate = async (req, job) => {

  const raw = await Raw.query(qb => {
    qb.where('id', job.data.id)
  }).fetch({
    transacting: req.analytics
  })

  try {

    await Promise.mapSeries(validations, async (validation) => {
      return await validation(req, raw.get('data'))
    })

    await raw.save({
      validation_status: 'processed'
    },{
      transacting: req.analytics,
      patch: true
    })

    await EnrichQueue.enqueue(req, {
      id: raw.get('id')
    })

  } catch(error) {

    await raw.save({
      validation_status: 'failed',
      validation_error: error.stack
    },{
      transacting: req.analytics,
      patch: true
    })

  }

}

export default validate
