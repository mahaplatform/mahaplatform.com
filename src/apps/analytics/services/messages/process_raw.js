import { getSession } from './sessions'
import { createEvent } from './events'
import { getUser } from './users'

export const processRaw = async(req, { raw }) => {

  const user = await getUser(req, {
    raw
  })

  const session = await getSession(req, {
    user,
    raw
  })

  await createEvent(req, {
    session,
    raw
  })

  await raw.save({
    status: 'processed'
  }, {
    transacting: req.trx
  })

}
