import Profile from '../../../../models/profile'
import { google } from 'googleapis'

export const getClient = async (req, trx) => {

  const auth = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, `${process.env.WEB_HOST}/google/token`)

  const profile = await Profile.query(qb => {
    qb.innerJoin('maha_sources', 'maha_sources.id', 'maha_profiles.source_id')
  }).where({
    text: 'google', user_id: req.user.get('id')
  }).fetch({
    transacting: trx
  })

  //TODO: refresh token

  auth.setCredentials(profile.get('data'))

  const client = google.drive({
    version: 'v3',
    auth
  })

  return client

}
