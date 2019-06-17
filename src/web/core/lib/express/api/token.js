import Session from '../../../../apps/maha/models/session'
import Device from '../../../../apps/maha/models/device'
import User from '../../../../apps/maha/models/user'
import Rollbar from '../../../services/rollbar'
import { decode } from '../../../services/jwt'
import moment from 'moment'

const getToken = (req) => {
  if(req.query.token) return req.query.token
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

  const { err, data } = decode(token)

  if(err && err === 'jwt expired') return res.status(401).json({
    status: 401,
    message: 'Expired token'
  })

  req.user = await User.where({
    id: data.user_id
  }).fetch({
    transacting: req.trx,
    withRelated: ['photo','team.logo']
  })

  if(!req.user) return res.status(401).json({
    status: 401,
    message: 'Invalid user'
  })

  req.team = req.user.related('team')

  if(req.headers.fingerprint) {

    req.device = await Device.where({
      fingerprint: req.headers.fingerprint
    }).fetch({
      transacting: req.trx,
      withRelated: ['display_name']
    })

    req.session = await Session.where({
      device_id: req.device.get('id'),
      user_id: req.user.get('id')
    }).fetch({
      transacting: req.trx
    })

    if(req.session) await req.session.save({
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
