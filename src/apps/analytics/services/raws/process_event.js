import { expandMessage } from '../messages/expand_message'
import { getDomainUser } from '../domain_users'
import { getEventType } from '../event_types'
import Raw from '@apps/analytics/models/raw'
import { getSession } from '../sessions'
import { createEvent } from '../events'
import isbot from 'isbot'

export const processEvent = async(req, { id }) => {

  const raw = await Raw.query(qb => {
    qb.where('id', id)
  }).fetch({
    transacting: req.analytics
  })

  try {

    const data = expandMessage(raw.get('data'))

    if(data.br_type !== 'Robot' && !isbot(data.useragent)) {

      const domain_user = await getDomainUser(req, {
        data
      })

      const event_type = await getEventType(req, { data })

      const session = await getSession(req, {
        domain_user,
        event_type,
        data
      })

      await createEvent(req, {
        session,
        event_type,
        data
      })

    }

    await raw.save({
      status: 'processed'
    }, {
      transacting: req.analytics,
      patch: true
    })

  } catch(error) {

    await raw.save({
      attempts: raw.get('attempts') + 1,
      status: 'failed',
      error: error.stack
    }, {
      transacting: req.analytics,
      patch: true
    })

  }

}
