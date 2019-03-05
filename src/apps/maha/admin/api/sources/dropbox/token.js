import Dropbox from 'dropbox-v2-api'

const dropbox = new Dropbox.authenticate({
  client_id: process.env.DROPBOX_APP_KEY,
  client_secret: process.env.DROPBOX_APP_SECRET,
  redirect_uri: `${process.env.WEB_HOST}/admin/dropbox/token`
})

const token = async (req, res, next) => {

  const data = await new Promise((resolve, reject) => {

    dropbox.getToken(req.query.code, (err, result, response) => {

      if(err) return reject(err)

      resolve(result)

    })

  })

  return data

}

export default token
