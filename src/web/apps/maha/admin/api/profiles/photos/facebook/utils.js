import { Facebook } from 'fb'

const client = new Facebook({
  appId: process.env.FACEBOOK_APP_ID,
  appSecret: process.env.FACEBOOK_APP_SECRET,
  Promise
})

export const getClient = async (req, profile) => {

  client.setAccessToken(profile.get('data').access_token)

  return client

}
