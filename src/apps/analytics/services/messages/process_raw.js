import { getNetworkUser } from '../network_users'
import { getDomainUser } from '../domain_users'
import { getSession } from '../sessions'
import { createEvent } from '../events'
import Raw from '../../models/raw'

export const processRaw = async(req, { id }) => {

  const raw = await Raw.where('id', id).fetch({
    transacting: req.trx
  })

  const network_user = await getNetworkUser(req, {
    data: raw.get('data')
  })

  const domain_user = await getDomainUser(req, {
    network_user,
    data: raw.get('data')
  })

  const session = await getSession(req, {
    domain_user,
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
