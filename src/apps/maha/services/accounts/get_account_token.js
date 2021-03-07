import { createUserToken } from '@core/utils/user_tokens'
import { getSignin } from '@apps/maha/services/signins'
import { getDevice } from '@apps/maha/services/devices'

const getAccountToken = async (req, { account }) => {

  const device = req.device || await getDevice(req, {
    fingerprint: req.headers.fingerprint
  })

  const signin = req.signin || await getSignin(req, {
    account,
    device
  })

  return createUserToken({
    account_id: req.account.get('id'),
    signin_id: signin.get('id')
  })

}

export default getAccountToken
