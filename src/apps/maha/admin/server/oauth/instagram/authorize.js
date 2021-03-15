import Instagram from 'instagram-node'

const ig = new Instagram.instagram()

ig.use({
  client_id: process.env.INSTAGRAM_CLIENT_ID,
  client_secret: process.env.INSTAGRAM_CLIENT_SECRET
})

const redirect_uri = `${process.env.ADMIN_HOST}/admin/oauth/instagram/token`

const authorize = async (req, { scope, state }) => {

  const url = await ig.get_authorization_url(redirect_uri, {
    scope,
    state
  })

  return url

}

export default authorize
