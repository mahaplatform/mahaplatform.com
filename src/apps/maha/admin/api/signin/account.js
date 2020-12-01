import { createUserToken } from '@core/utils/user_tokens'
import { decode } from '@core/services/jwt'
import Account from '@apps/maha/models/account'

const getToken = (req) => {
  if(req.query.token) return req.query.token
  if(!req.headers.authorization) return null
  const token = req.headers.authorization
  const matches = token.match(/Bearer (.*)/)
  return matches[1]
}

const accountRoute = async (req, res, next) => {

  req.token = getToken(req)

  if(true || !req.token) return res.status(401).json({
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

  res.status(200).respond({
    id: account.get('id'),
    full_name: account.get('full_name'),
    initials: account.get('initials'),
    email: account.get('email'),
    photo: account.related('photo') ? account.related('photo').get('path') : null,
    authentication_strategy: account.get('authentication_strategy'),
    features: account.related('features').map(feature => feature.get('title')),
    use_twofactor: account.get('use_twofactor'),
    is_blocked: account.get('is_blocked'),
    locked_out_at: account.get('locked_out_at'),
    token: createUserToken(account, 'account_id')
  })

}

export default accountRoute
