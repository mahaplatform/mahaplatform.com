import Instagram from 'instagram-node'

const ig = new Instagram.instagram()

ig.use({
  client_id: process.env.INSTAGRAM_CLIENT_ID,
  client_secret: process.env.INSTAGRAM_CLIENT_SECRET
})

const authorize_user = Promise.promisify(ig.authorize_user)

const redirect_uri = `${process.env.WEB_HOST}/admin/instagram/token`

const token = async (req, res) => {

  const data = await authorize_user(req.query.code, redirect_uri)

  return {
    access_token: data.access_token
  }

}

export default token
