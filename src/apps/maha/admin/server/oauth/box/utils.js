import Profile from '@apps/maha/models/profile'
import Box from 'box-node-sdk'

const box = new Box({
  clientID: process.env.BOX_CLIENT_ID,
  clientSecret: process.env.BOX_CLIENT_SECRET
})

export const getClient = async (req) => {

  const profile = await Profile.query(qb => {
    qb.where('account_id', req.account.get('id'))
    qb.where('source', 'box')
  }).fetch({
    transacting: req.trx
  })

  const expiration = new Date(parseFloat(profile.get('data').acquiredAtMS + profile.get('data').accessTokenTTLMS - 300000))

  if(expiration <= new Date()) {

    const data = await box.getTokensRefreshGrant(profile.get('data').refreshToken)

    await profile.save({
      data
    }, {
      patch: true,
      transacting: req.trx
    })

  }

  return box.getBasicClient(profile.get('data').accessToken)

}
