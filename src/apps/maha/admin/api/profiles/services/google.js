import { google } from 'googleapis'

export const getClient = async (req, profile, service) => {

  const auth = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, `${process.env.WEB_HOST}/google/token`)

  auth.setCredentials(profile.get('data'))

  if(service === 'drive') {
    return google.drive({
      version: 'v3',
      auth
    })
  }

  if(service === 'gmail') {
    return google.gmail({
      version: 'v1',
      auth
    })
  }

  if(service === 'people') {
    return google.people({
      version: 'v1',
      auth
    })
  }

}
