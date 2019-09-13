import { Facebook } from 'fb'

const fb = new Facebook({
  appId: process.env.FACEBOOK_APP_ID,
  appSecret: process.env.FACEBOOK_APP_SECRET,
  Promise
})

const authorize = async (req) => {

  return await fb.getLoginUrl({
    scope: 'user_photos,email,public_profile,pages_show_list',
    redirect_uri: `${process.env.WEB_HOST}/admin/facebook/token`,
    state: req.user.get('id')
  })

}

export default authorize
