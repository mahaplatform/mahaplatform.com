import Profile from '../../../../models/profile'
import Box from 'box-node-sdk'

const box = new Box({
  clientID: process.env.BOX_CLIENT_ID,
  clientSecret: process.env.BOX_CLIENT_SECRET
})

export const getClient = async (req, trx) => {

  const query = qb => qb.innerJoin('maha_sources', 'maha_sources.id', 'maha_profiles.source_id')

  const profile = await Profile.query(query).where({ text: 'box', user_id: req.user.get('id')}).fetch({ transacting: trx })

  const expiration = new Date(parseFloat(profile.get('data').acquiredAtMS + profile.get('data').accessTokenTTLMS - 300000))

  if(expiration <= new Date()) {

    const data = await box.getTokensRefreshGrant(profile.get('data').refreshToken)

    await profile.save({ data }, { patch: true, transacting: trx })

  }

  const client = box.getBasicClient(profile.get('data').accessToken)

  return client

}
