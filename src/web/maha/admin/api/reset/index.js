import { loadUserFromToken } from '../../../core/utils/user_tokens'
import { Segment, BackframeError } from '../../../server'
import email from './email'
import verify from './verify'
import security from './security'
import password from './password'
import moment from 'moment'

const _getToken = (req) => {

  if(req.body.token) return req.body.token

  if(req.query.token) return req.query.token

  if(req.headers.authorization) {

    const matches = req.headers.authorization.match(/Bearer (.*)/)

    if(!matches) return null

    return matches[1]

  }

}

const alterRequest = async (req, trx, options) => {

  const token = _getToken(req)

  const { user, iat } = await loadUserFromToken('reset_id', token, trx)

  const reset_at = user.get('reset_at')

  if(reset_at && (moment(reset_at).unix() - iat) > 0) {
    throw new BackframeError({
      code: 404,
      message: 'This reset token has expired'
    })
  }

  await user.load(['team'], { transacting: trx })

  req.team = user.related('team')

  req.user = user

}

const authenticatedSegment = new Segment({
  alterRequest,
  authenticated: false,
  routes: [
    verify,
    security,
    password
  ]
})

const resetSegment = new Segment({
  authenticated: false,
  path: '/reset',
  routes: [
    authenticatedSegment,
    email
  ]
})

export default resetSegment
