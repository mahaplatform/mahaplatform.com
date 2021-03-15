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

const authorize = async (req, { scope, state }) => {

  const url = await oauth2.authorizationCode.authorizeURL({
    redirect_uri: `${process.env.ADMIN_HOST}/admin/oauth/microsoft/token`,
    scope: [
      ...scope,
      'offline_access'
    ].join(' '),
    state
  })

  return url

}

export default authorize
