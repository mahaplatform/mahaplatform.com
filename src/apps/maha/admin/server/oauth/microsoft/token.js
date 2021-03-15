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

const getPhotoData = async (bearer) => {
  try {
    return await request.get('https://graph.microsoft.com/v1.0/me/photo/$value', {
      auth: { bearer },
      encoding: null
    })
  } catch(e) {
    return null
  }
}

const token = async ({ code }, scope) => {

  let result = await oauth2.authorizationCode.getToken({
    redirect_uri: `${process.env.ADMIN_HOST}/admin/oauth/microsoft/token`,
    scope: scope.join(' '),
    code
  })

  const data = await oauth2.accessToken.create(result)

  const client = Client.init({
    authProvider: (done) => done(null, data.token.access_token)
  })

  const userinfo = await client.api('/me').get()

  const photo_data = await getPhotoData(data.token.access_token)

  return [{
    photo_data,
    profile_id: userinfo.id,
    username: userinfo.userPrincipalName,
    data: data.token
  }]

}

export default token
