import { expandMessage } from '../messages/expand_message'
import { getDomainUser } from '../domain_users'
import Raw from '@apps/analytics/models/raw'
import { getSession } from '../sessions'
import { createEvent } from '../events'
import isbot from 'isbot'

export const processEvent = async(req, { message }) => {

  const raw = await Raw.forge({
    data: message,
    status: 'pending',
    attempts: 0
  }).save(null, {
    transacting: req.analytics
  })

  try {

    const data = expandMessage(message)

    if(data.br_type !== 'Robot' && !isbot(data.useragent)) {

      const domain_user = await getDomainUser(req, {
        data
      })

      const session = await getSession(req, {
        domain_user,
        data
      })

      await createEvent(req, {
        session,
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
      attempts: parseInt(raw.get('attempts')) + 1,
      status: 'failed',
      error: error.stack
    }, {
      transacting: req.analytics,
      patch: true
    })

  }

}
