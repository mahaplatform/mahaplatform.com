import User from '../../../../../apps/maha/models/user'
import { decode } from '../../../../services/jwt'

const getToken = (req, res) => {
  if(req.query.token) return req.query.token
  if(!req.headers.authorization) return null
  const token = req.headers.authorization
  const matches = token.match(/Bearer (.*)/)
  return matches[1]
}

const route = async (req, res, next) => {

  const token = getToken(req, res)

  if(!token) return res.status(401).json({
    message: 'No token'
  })

  const { err, data } = decode(token)

  if(err && err === 'jwt expired') return res.status(401).json({
    message: 'Expired token'
  })

  const user = await User.where({
    id: data.user_id
  }).fetch({
    transacting: req.trx
  })

  if(!user) return res.status(401).json({
    message: 'Invalid user'
  })

  req.user = user

  next()

}

export default route
