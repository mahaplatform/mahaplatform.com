import Profile from '@apps/maha/models/profile'
import Dropbox from 'dropbox-v2-api'

export const getClient = async (req) => {

  const profile = await Profile.query(qb => {
    qb.where('account_id', req.account.get('id'))
    qb.where('source', 'dropbox')
  }).fetch({
    transacting: req.trx
  })

  //TODO: refresh token

  const client = new Dropbox.authenticate({
    token: profile.get('data').access_token
  })

  return Promise.promisify(client)

}
