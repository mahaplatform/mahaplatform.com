import Instagram from 'instagram-node'

const ig = new Instagram.instagram()

ig.use({
  client_id: process.env.INSTAGRAM_CLIENT_ID,
  client_secret: process.env.INSTAGRAM_CLIENT_SECRET
})

const authorize_user = Promise.promisify(ig.authorize_user)

const redirect_uri = `${process.env.WEB_HOST}/admin/instagram/token`

const token = async (code, scope) => {

  const data = await authorize_user(code, redirect_uri)

  return [{
    photo_url: data.user.profile_picture,
    profile_id: data.user.id,
    username: data.user.username,
    data: {
      access_token: data.access_token
    }
  }]

}

export default token
