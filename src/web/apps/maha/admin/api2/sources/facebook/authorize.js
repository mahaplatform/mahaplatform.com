import { Facebook } from 'fb'

const fb = new Facebook({
  appId: process.env.FACEBOOK_APP_ID,
  appSecret: process.env.FACEBOOK_APP_SECRET,
  Promise
})

const authorizeRoute = async (req, res) => {

  const url = await fb.getLoginUrl({
    scope: 'user_photos',
    redirect_uri: `${process.env.WEB_HOST}/admin/facebook/token`,
    state: req.user.get('id')
  })

  res.status(200).respond(url)

}

export default authorizeRoute
