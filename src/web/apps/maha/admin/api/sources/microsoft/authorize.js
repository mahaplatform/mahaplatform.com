import { Route } from '../../../../../../core/backframe'
import OAuth2 from 'simple-oauth2'

const oauth2 = OAuth2.create({
  client: {
    id: process.env.MICROSOFT_APP_ID,
    secret: process.env.MICROSOFT_APP_SECRET
  },
  auth: {
    tokenHost: 'https://login.microsoftonline.com',
    authorizePath: 'common/oauth2/v2.0/authorize',
    tokenPath: 'common/oauth2/v2.0/token'
  }
})

const processor = async (req, trx, options) => {

  const url = await oauth2.authorizationCode.authorizeURL({
    redirect_uri: `${process.env.WEB_HOST}/admin/microsoft/token`,
    scope: 'offline_access files.read.all',
    state: req.user.get('id')
  })

  return url

}

const authorizeRoute = new Route({
  method: 'get',
  path: '/microsoft/authorize',
  processor
})

export default authorizeRoute
