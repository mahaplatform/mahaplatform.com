import { google } from 'googleapis'

const auth = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, `${process.env.ADMIN_HOST}/admin/oauth/google/token`)

const token = async ({ code }, scope) => {

  const data = await auth.getToken(code)

  auth.setCredentials(data.tokens)

  var oauth2 = google.oauth2({
    auth,
    version: 'v2'
  })

  const userinfo = await oauth2.userinfo.get()

  return [{
    photo_url: userinfo.data.picture,
    profile_id: userinfo.data.id,
    name: userinfo.data.name,
    username: userinfo.data.email,
    data: data.tokens
  }]

}

export default token
