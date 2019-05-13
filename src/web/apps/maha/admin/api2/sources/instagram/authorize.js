import Instagram from 'instagram-node'

const ig = new Instagram.instagram()

ig.use({
  client_id: process.env.INSTAGRAM_CLIENT_ID,
  client_secret: process.env.INSTAGRAM_CLIENT_SECRET
})

const redirect_uri = `${process.env.WEB_HOST}/admin/instagram/token`

const authorizeRoute = async (req, res) => {

  const url = await ig.get_authorization_url(redirect_uri, {
    scope: 'basic',
    state: req.user.get('id')
  })

  res.status(200).respond(url)

}

export default authorizeRoute
