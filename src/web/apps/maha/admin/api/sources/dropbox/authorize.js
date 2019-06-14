import Dropbox from 'dropbox-v2-api'

const dropbox = new Dropbox.authenticate({
  client_id: process.env.DROPBOX_APP_KEY,
  client_secret: process.env.DROPBOX_APP_SECRET,
  redirect_uri: `${process.env.WEB_HOST}/admin/dropbox/token`
})

const authorizeRoute = async (req, res) => {

  const path = await dropbox.generateAuthUrl()

  const url = `${path}&state=${req.user.get('id')}`

  res.status(200).respond(url)
}

export default authorizeRoute
