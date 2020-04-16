import { Facebook } from 'fb'

const fb = new Facebook({
  appId: process.env.FACEBOOK_APP_ID,
  appSecret: process.env.FACEBOOK_APP_SECRET,
  Promise
})

const token = async ({ code }, scope) => {

  const data = await fb.api('oauth/access_token', {
    client_id: process.env.FACEBOOK_APP_ID,
    client_secret: process.env.FACEBOOK_APP_SECRET,
    redirect_uri: `${process.env.WEB_HOST}/admin/oauth/facebook/token`,
    code
  })

  fb.setAccessToken(data.access_token)

  const userinfo = await fb.api('me', {
    fields: ['id','name','picture']
  })

  const pages = await fb.api('me/accounts', {
    fields: ['id','name','picture']
  })

  return [
    {
      photo_url: userinfo.picture ? userinfo.picture.data.url : null,
      profile_id: userinfo.id,
      username: userinfo.name,
      data
    },
    ...pages.data.map(page => ({
      photo_url: page.picture ? page.picture.data.url : null,
      profile_id: page.id,
      username: page.name,
      data
    }))
  ]



}

export default token
