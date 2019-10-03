import { decode } from '../../../../../web/core/services/jwt'
import User from '../../../models/user'
import moment from 'moment'

const route = async (req, res, next) => {

  if(!req.body.token) return res.status(401).json({
    status: 401,
    message: 'No token'
  })

  const { err, iat, data } = decode(req.body.token)

  if(err && err === 'jwt expired') return res.status(401).json({
    status: 401,
    message: 'Expired token'
  })

  req.user = await User.where({
    id: data.reset_id
  }).fetch({
    transacting: req.trx,
    withRelated: ['photo','team']
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

  req.team = req.user.related('team')

  next()

}

export default route
