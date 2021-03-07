import Account from '@apps/maha/models/account'
import Signin from '@apps/maha/models/signin'
import * as jwt from '@core/services/jwt'

export const authenticate = async (token) => {

  if(!token) throw new Error('no token provided')

  const tokenData = jwt.decode(token)

  if(!tokenData.data.account_id) throw new Error('invalid token: no account_id')

  if(!tokenData.data.signin_id) throw new Error('invalid token: no signin_id')

  const account = await Account.where({
    id: tokenData.data.account_id
  }).fetch()

  if(!account) throw new Error('invalid user')

  const signin = await Signin.where({
    id: tokenData.data.signin_id
  }).fetch({
    withRelated: ['device.platform_type', 'device.device_type', 'device.os_name', 'device.browser_name']
  })

  return {
    account,
    signin
  }

}
