import Profile from '../../../../models/profile'
import Dropbox from 'dropbox-v2-api'

export const getClient = async (req, trx) => {

  const query = qb => qb.innerJoin('maha_sources', 'maha_sources.id', 'maha_profiles.source_id')

  const profile = await Profile.query(query).where({ text: 'dropbox', user_id: req.user.get('id')}).fetch({ transacting: trx })

  //TODO: refresh token

  const client = new Dropbox.authenticate({
    token: profile.get('data').access_token
  })

  return Promise.promisify(client)

}
