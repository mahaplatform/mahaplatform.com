import Profile from '../../../../models/profile'
import { Facebook } from 'fb'

const client = new Facebook({
  appId: process.env.FACEBOOK_APP_ID,
  appSecret: process.env.FACEBOOK_APP_SECRET,
  Promise
})

export const getClient = async (req, trx) => {

  const query = qb => qb.innerJoin('maha_sources', 'maha_sources.id', 'maha_profiles.source_id')

  const profile = await Profile.query(query).where({ text: 'facebook', user_id: req.user.get('id')}).fetch({ transacting: trx })

  //TODO: refresh token

  client.setAccessToken(profile.get('data').access_token)

  return client

}
