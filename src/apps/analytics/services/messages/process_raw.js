import { getSession } from '../sessions'
import { createEvent } from '../events'
import Raw from '../../models/raw'
import { getUser } from '../users'

export const processRaw = async(req, { id }) => {

  const raw = await Raw.where('id', id).fetch({
    transacting: req.trx
  })

  const user = await getUser(req, {
    data: raw.get('data')
  })

  const session = await getSession(req, {
    user,
    data: raw.get('data')
  })

  await createEvent(req, {
    session,
    data: raw.get('data')
  })

  await raw.save({
    status: 'processed'
  }, {
    transacting: req.trx
  })

}
