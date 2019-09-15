import { Facebook } from 'fb'

const fb = new Facebook({
  appId: process.env.FACEBOOK_APP_ID,
  appSecret: process.env.FACEBOOK_APP_SECRET,
  Promise
})

// scope: 'user_photos,email,public_profile,pages_show_list'

const authorize = async (req, { scope, state }) => {

  return await fb.getLoginUrl({
    scope: scope.join(','),
    redirect_uri: `${process.env.WEB_HOST}/admin/facebook/token`,
    state
  })

}

export default authorize
