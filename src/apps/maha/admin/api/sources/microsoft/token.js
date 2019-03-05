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

const token = async (req, res, next) => {

  let result = await oauth2.authorizationCode.getToken({
    redirect_uri: `${process.env.WEB_HOST}/admin/microsoft/token`,
    scope: 'files.read.all',
    code: req.query.code
  })

  const data = await oauth2.accessToken.create(result)

  return data.token

}

export default token
