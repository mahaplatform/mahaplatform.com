import Dropbox from 'dropbox-v2-api'

const dropbox = new Dropbox.authenticate({
  client_id: process.env.DROPBOX_APP_KEY,
  client_secret: process.env.DROPBOX_APP_SECRET,
  redirect_uri: `${process.env.WEB_HOST}/admin/dropbox/token`
})

const authorize = async (req, res) => {

  const path = await dropbox.generateAuthUrl()

  return `${path}&state=${req.user.get('id')}`
}

export default authorize
