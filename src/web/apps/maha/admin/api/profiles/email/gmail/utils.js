import { google } from 'googleapis'

export const getClient = async (req, profile) => {

  const auth = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, `${process.env.WEB_HOST}/google/token`)

  auth.setCredentials(profile.get('data'))

  const client = google.gmail({
    version: 'v1',
    auth
  })

  return client

}
