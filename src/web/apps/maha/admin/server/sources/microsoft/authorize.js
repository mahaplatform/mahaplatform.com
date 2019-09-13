import OAuth2 from 'simple-oauth2'

const oauth2 = OAuth2.create({
  client: {
    id: process.env.MICROSOFT_APP_ID,
    secret: process.env.MICROSOFT_APP_SECRET
  },
  auth: {
    tokenHost: 'https://login.microsoftonline.com',
    authorizePath: 'common/oauth2/v2.0/authorize',
    tokenPath: 'common/oauth2/v2.0/token'
  }
})

const authorize = async (req, res) => {

  const url = await oauth2.authorizationCode.authorizeURL({
    redirect_uri: `${process.env.WEB_HOST}/admin/microsoft/token`,
    scope: 'user.read files.read.all',
    state: req.user.get('id')
  })

  console.log(url)

  return url

}

export default authorize
