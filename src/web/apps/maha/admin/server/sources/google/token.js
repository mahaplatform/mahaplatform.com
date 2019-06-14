import { google } from 'googleapis'

const auth = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, `${process.env.WEB_HOST}/admin/google/token`)

const token = async (req, res) => {

  return await new Promise((resolve, reject) => {
    auth.getToken(req.query.code, (err, data) => {
      if(err) reject(err)
      resolve(data)
    })
  })

}

export default token
