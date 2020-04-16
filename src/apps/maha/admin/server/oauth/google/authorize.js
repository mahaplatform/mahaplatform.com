import { google } from 'googleapis'

const auth = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, `${process.env.WEB_HOST}/admin/oauth/google/token`)

const authorize = async (req, { scope, state }) => {

  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    state,
    scope: scope.map(scope => {
      return `https://www.googleapis.com/auth/${scope}`
    })
  })

}

export default authorize
