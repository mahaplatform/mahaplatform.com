import { Facebook } from 'fb'

const fb = new Facebook({
  appId: process.env.FACEBOOK_APP_ID,
  appSecret: process.env.FACEBOOK_APP_SECRET,
  Promise
})

const token = async (req, res) => {

  return await fb.api('oauth/access_token', {
    client_id: process.env.FACEBOOK_APP_ID,
    client_secret: process.env.FACEBOOK_APP_SECRET,
    redirect_uri: `${process.env.WEB_HOST}/admin/facebook/token`,
    code: req.query.code
  })

}

export default token
