import { Plugin, BackframeError } from '../../backframe'
import Device from '../../../apps/maha/models/device'
import Session from '../../../apps/maha/models/session'
import passport from '../../services/passport'
import Rollbar from '../../services/rollbar'
import moment from 'moment'

const alterRequest = async (req, trx, options) => {

  if(!options.authenticated) return req

  return await new Promise((resolve, reject) => {

    return passport('user_id', trx).authenticate('jwt', { session: false }, async (err, user, info) => {

      if(err) return reject(new BackframeError({
        code: 401,
        message: 'Unable to find user'
      }))

      if(!user) return reject(new BackframeError({
        code: 401,
        message: info.message
      }))

      const invalidated_at = user.get('invalidated_at')

      if(invalidated_at && (moment(invalidated_at).unix() - info.iat) > 0) {
        reject(new BackframeError({
          code: 401,
          message: 'This token has expired'
        }))
      }

      req.jwt = info

      req.team = user.related('team')

      req.user = user

      const fingerprint = req.headers.fingerprint

      if(fingerprint) {

        req.device = await Device.where({ fingerprint }).fetch({
          transacting: trx,
          withRelated: ['display_name']
        })

        req.session = await Session.where({
          device_id: req.device.get('id'),
          user_id: req.user.get('id')
        }).fetch({ transacting: trx })

      }

      Rollbar.configure({
        payload: {
          person: {
            id: user.get('id'),
            username: user.get('full_name'),
            email: user.get('email')
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

      await req.user.save({
        last_online_at: moment()
      }, { patch: true, transacting: trx })

      if(req.session) req.session.save({
        last_active_at: moment()
      }, { patch: true, transacting: trx })

      resolve(req)

    })(req)

  })

}

const authenticatorPlugin = new Plugin({
  name: 'authenticator',
  alterRequest
})

export default authenticatorPlugin
