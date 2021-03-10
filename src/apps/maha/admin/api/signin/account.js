import AccountSerializer from '@apps/maha/serializers/account_serializer'
import { createUserToken } from '@core/utils/user_tokens'
import { getSignin } from '@apps/maha/services/signins'
import { getDevice } from '@apps/maha/services/devices'
import Account from '@apps/maha/models/account'
import { decode } from '@core/services/jwt'

const getToken = (req) => {
  if(req.query.token) return req.query.token
  if(!req.headers.authorization) return null
  const token = req.headers.authorization
  const matches = token.match(/Bearer (.*)/)
  return matches[1]
}

const accountRoute = async (req, res, next) => {

  req.token = getToken(req)

  if(!req.token) return res.status(401).json({
    status: 401,
    message: 'No token'
  })

  const { err, data } = decode(req.token)

  if(err && err === 'jwt expired') return res.status(401).json({
    status: 401,
    message: 'Expired token'
  })

  if(err) return res.status(401).json({
    status: 401,
    message: 'Invalid token'
  })

  const account = await Account.query(qb => {
    qb.where('id', data.account_id)
  }).fetch({
    withRelated: ['features','users.photo','users.team.logo'],
    transacting: req.trx
  })

  if(!account) return res.status(401).json({
    status: 401,
    message: 'Invalid account'
  })

  const device = await getDevice(req, {
    fingerprint: req.headers.fingerprint
  })

  const signin = await getSignin(req, {
    device,
    account
  })

  account.set('signin_id', signin.get('id'))

  account.set('token', createUserToken({
    account_id: account.get('id'),
    signin_id: signin.get('id')
  }))

  await res.status(200).respond(account, AccountSerializer)

}

export default accountRoute
