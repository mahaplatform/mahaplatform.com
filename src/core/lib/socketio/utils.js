import Session from '@apps/maha/models/session'
import User from '@apps/maha/models/user'
import * as jwt from '../../services/jwt'

export const authenticate = async (token) => {

  if(!token) throw new Error('no token provided')

  const tokenData = jwt.decode(token)

  if(!tokenData.data.user_id) throw new Error('invalid token: no user_id')

  if(!tokenData.data.session_id) throw new Error('invalid token: no session_id')

  const user = await User.where({
    id: tokenData.data.user_id
  }).fetch()

  if(!user) throw new Error('invalid user')

  const session = await Session.where({
    id: tokenData.data.session_id
  }).fetch({
    withRelated: ['device.platform_type', 'device.device_type', 'device.os_name', 'device.browser_name']
  })

  return {
    session,
    user
  }

}
