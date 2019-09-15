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

// scope:'user.read files.read.all'
const authorize = async (req, { scope, state }) => {

  const url = await oauth2.authorizationCode.authorizeURL({
    redirect_uri: `${process.env.WEB_HOST}/admin/microsoft/token`,
    scope: scope.join(' '),
    state
  })

  return url

}

export default authorize
