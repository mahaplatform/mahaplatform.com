import { Client } from '@microsoft/microsoft-graph-client'
import OAuth2 from 'simple-oauth2'
import request from 'request-promise'

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

const token = async (code, scope) => {

  let result = await oauth2.authorizationCode.getToken({
    redirect_uri: `${process.env.WEB_HOST}/admin/microsoft/token`,
    scope: scope.join(' '),
    code
  })

  const data = await oauth2.accessToken.create(result)

  const client = Client.init({
    authProvider: (done) => done(null, data.token.access_token)
  })

  const userinfo = await client.api('/me').get()

  const photo = await request.get('https://graph.microsoft.com/v1.0/me/photo/$value', {
    auth: {
      bearer: data.token.access_token
    }, encoding: null
  })

  return [{
    photo_data: photo,
    profile_id: userinfo.id,
    username: userinfo.userPrincipalName,
    data: {
      token: data.token
    }
  }]

}

export default token
