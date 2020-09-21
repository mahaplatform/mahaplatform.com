import { decode } from '../../../../../core/services/jwt'
import Account from '../../../models/account'
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

  req.account = await Account.where({
    id: data.reset_id
  }).fetch({
    transacting: req.trx,
    withRelated: ['photo']
  })

  if(!req.account) return res.status(401).json({
    status: 401,
    message: 'Invalid account'
  })

  const reset_at = req.account.get('reset_at')

  if(reset_at && (moment(reset_at).unix() - iat) > 0) return res.status(404).json({
    code: 404,
    message: 'This reset token has expired'
  })

  next()

}

export default route
