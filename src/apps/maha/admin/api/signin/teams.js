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

const teamsRoute = async (req, res, next) => {

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

  req.account = await Account.query(qb => {
    qb.where('id', data.account_id)
  }).fetch({
    withRelated: ['users.photo','users.team.logo'],
    transacting: req.trx
  })

  if(!req.account) return res.status(401).json({
    status: 401,
    message: 'Invalid account'
  })

  const users = req.account.related('users').filter(user => {
    return user.get('activated_at') !== null && user.get('is_active') && user.related('team').get('is_active')
  })

  res.status(200).respond(users, (req, user) => {
    const team = user.related('team')
    return {
      id: team.get('id'),
      logo: team.related('logo') ? team.related('logo').get('path') : null,
      title: team.get('title'),
      subdomain: team.get('subdomain'),
      token: createUserToken(user, 'user_id'),
      user: {
        id: user.get('id'),
        full_name: user.get('full_name'),
        email: user.get('email'),
        photo: user.related('photo') ? user.related('photo').get('path') : null
      }
    }
  })

}

export default teamsRoute
