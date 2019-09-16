import { Client } from '@microsoft/microsoft-graph-client'
import OAuth2 from 'simple-oauth2'

const getOauth2 = () => OAuth2.create({
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

export const getClient = async (req, profile) => {

  const expiration = new Date(parseFloat(new Date(profile.get('data').expires_at).getTime() - 300000))

  if(expiration <= new Date()) {

    const oauth2 = getOauth2()

    const data = await oauth2.accessToken.create({
      refresh_token: profile.get('data').refresh_token
    }).refresh()

    await profile.save({
      data: data.token
    }, {
      patch: true,
      transacting: req.trx
    })

  }

  const client = Client.init({
    authProvider: (done) => done(null, profile.get('data').access_token)
  })

  console.log()

  return client

}
