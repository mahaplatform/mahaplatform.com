import { getSignin } from '@apps/maha/services/signins'
import { getDevice } from '@apps/maha/services/devices'
import Account from '@apps/maha/models/account'
import { decode } from '@core/services/jwt'
import Rollbar from '@core/vendor/rollbar'
import Team from '@apps/maha/models/team'
import User from '@apps/maha/models/user'
import moment from 'moment'

const getToken = (req) => {
  if(req.query.token) return req.query.token
  if(!req.headers.authorization) return null
  const token = req.headers.authorization
  const matches = token.match(/Bearer (.*)/)
  return matches[1]
}

const route = async (req, res, next) => {

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

  req.user = await User.where({
    id: data.user_id
  }).fetch({
    transacting: req.trx
  })

  if(!req.user) return res.status(401).json({
    status: 401,
    message: 'Invalid user'
  })

  req.account = await Account.where({
    id: req.user.get('account_id')
  }).fetch({
    transacting: req.trx
  })

  req.team = await Team.where({
    id: req.user.get('team_id')
  }).fetch({
    transacting: req.trx
  })

  if(req.team.get('deleted_at')) return res.status(401).json({
    status: 401,
    message: 'Invalid team'
  })

  if(req.headers.fingerprint) {

    req.device = await getDevice(req, {
      fingerprint: req.headers.fingerprint
    })

    req.signin = await getSignin(req, {
      device: req.device,
      account: req.account
    })

    await req.signin.save({
      last_active_at: moment()
    }, {
      patch: true,
      transacting: req.trx
    })

  }

  if(process.env.NODE_ENV === 'production') {

    Rollbar.configure({
      payload: {
        person: {
          id: req.user.get('id'),
          username: req.user.get('full_name'),
          email: req.user.get('email')
        },
        request: {
          headers: req.headers,
          params: req.params,
          method: req.method,
          query: req.query,
          body: req.body,
          url: req.url
        }
      }
    })

  }

  await req.user.save({
    last_online_at: moment()
  }, {
    patch: true,
    transacting: req.trx
  })

  next()

}

export default route
