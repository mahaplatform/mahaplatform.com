import Profile from '../../../../models/profile'
import Instagram from 'instagram-node'

const client = new Instagram.instagram()

client.use({
  client_id: process.env.INSTAGRAM_CLIENT_ID,
  client_secret: process.env.INSTAGRAM_CLIENT_SECRET
})

export const getClient = async (req, trx) => {

  const query = qb => qb.innerJoin('maha_sources', 'maha_sources.id', 'maha_profiles.source_id')

  const profile = await Profile.query(query).where({ text: 'instagram', user_id: req.user.get('id')}).fetch({ transacting: trx })

  client.use({ access_token: profile.get('data').access_token })

  //TODO: refresh token

  return client

}
