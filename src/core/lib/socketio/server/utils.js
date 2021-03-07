import User from '@apps/maha/models/user'
import * as jwt from '@core/services/jwt'

export const authenticate = async (token) => {

  if(!token) throw new Error('no token provided')

  const tokenData = jwt.decode(token)

  if(!tokenData.data.user_id) throw new Error('invalid token: no user_id')

  const user = await User.where({
    id: tokenData.data.user_id
  }).fetch()

  if(!user) throw new Error('invalid user')

  return {
    user
  }

}
