import { decode } from '../../../../../core/services/jwt'
import User from '../../../models/user'
import moment from 'moment'

const getToken = (req) => {
  if(req.body.token) return req.body.token
  if(!req.headers.authorization) return null
  const token = req.headers.authorization
  const matches = token.match(/Bearer (.*)/)
  return matches[1]
}

const route = async (req, res, next) => {

  const token = getToken(req)

  if(!token) return res.status(401).json({
    status: 401,
    message: 'No token'
  })

  const { err, iat, data } = decode(token)

  if(err && err === 'jwt expired') return res.status(401).json({
    status: 401,
    message: 'Expired token'
  })

  req.user = await User.where({
    id: data.activation_id
  }).fetch({
    transacting: req.trx,
    withRelated: ['photo','team.logo','account.photo']
  })

  if(!req.user) return res.status(401).json({
    status: 401,
    message: 'Invalid user'
  })

  const reset_at = req.user.get('reset_at')

  if(reset_at && (moment(reset_at).unix() - iat) > 0) return res.status(404).json({
    code: 404,
    message: 'This reset token has expired'
  })

  req.account = req.user.related('account')

  req.team = req.user.related('team')

  next()

}

export default route
