import { loadUserFromToken } from '../../../../../core/utils/user_tokens'
import notifications from './notifications'
import { Segment } from '../../../../../core/backframe'
import security from './security'
import password from './password'
import assets from '../assets'
import verify from './verify'
import avatar from './avatar'

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

  const { user } = await loadUserFromToken('activation_id', token, trx)

  await user.load(['team'], { transacting: trx })

  req.team = user.related('team')

  req.user = user

}

const activateSegment = new Segment({
  alterRequest,
  authenticated: false,
  path: '/activate',
  routes: [
    verify,
    security,
    password,
    avatar,
    notifications,
    assets
  ]
})

export default activateSegment
