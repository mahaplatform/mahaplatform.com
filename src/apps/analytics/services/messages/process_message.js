import { getNetworkUser } from '../network_users'
import { expandMessage } from './expand_message'
import { getDomainUser } from '../domain_users'
import { getSession } from '../sessions'
import { createEvent } from '../events'

export const processMessage = async(req, { message }) => {

  const data = expandMessage(message)

  if(data.br_type === 'Robot') return

  const network_user = await getNetworkUser(req, {
    data
  })

  const domain_user = await getDomainUser(req, {
    network_user,
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
