import { google } from 'googleapis'

const auth = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, `${process.env.WEB_HOST}/admin/google/token`)

const authorizeRoute = async (req, res) => {

  const url = auth.generateAuthUrl({
    access_type: 'offline',
    state: req.user.get('id'),
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/drive.photos.readonly'
    ]
  })

  res.status(200).respond(url)

}

export default authorizeRoute
