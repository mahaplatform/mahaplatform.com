import { decode } from '@core/services/jwt'
import Account from '../../../models/account'

const route = async (req, res, next) => {

  if(!req.body.token) return res.status(401).json({
    status: 401,
    message: 'No token'
  })

  const { err, data } = decode(req.body.token)

  if(err && err === 'jwt expired') return res.status(401).json({
    status: 401,
    message: 'Expired token'
  })

  req.account = await Account.where({
    id: data.account_id
  }).fetch({
    transacting: req.trx,
    withRelated: ['photo']
  })

  if(!req.account) return res.status(401).json({
    status: 401,
    message: 'Invalid account'
  })

  next()

}

export default route
