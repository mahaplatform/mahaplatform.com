import { getDomainUser } from './domain_users'
import { getEventType } from './event_types'
import { getSession } from './sessions'
import { createEvent } from './events'
import Raw from '@apps/analytics/models/raw'

export const model = async(req, job) => {

  const raw = await Raw.query(qb => {
    qb.where('id', job.data.id)
  }).fetch({
    transacting: req.analytics
  })

  try {

    const enriched = raw.get('enriched')

    const domain_user = await getDomainUser(req, { enriched })

    const event_type = await getEventType(req, { enriched })

    const session = await getSession(req, {
      domain_user,
      event_type,
      enriched
    })

    await createEvent(req, {
      session,
      event_type,
      enriched
    })

    await raw.save({
      modeling_status: 'processed'
    }, {
      transacting: req.analytics,
      patch: true
    })

  } catch(error) {

    await raw.save({
      modeling_status: 'failed',
      modeling_error: error.stack
    }, {
      transacting: req.analytics,
      patch: true
    })

  }

}

export default model
