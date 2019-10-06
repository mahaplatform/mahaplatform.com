import { OAuth } from 'oauth'

const authorize = async (req, { scope, state }) => {

  var oauth = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.TWITTER_API_KEY,
    process.env.TWITTER_API_SECRET_KEY,
    '1.0',
    encodeURI(`${process.env.WEB_HOST}/admin/twitter/token?state=${state}`),
    'HMAC-SHA1'
  )

  oauth.setClientOptions({ requestTokenHttpMethod: 'POST' })

  const { token } = await new Promise((resolve, reject) => {
    oauth.getOAuthRequestToken(function(err, token, secret) {
      resolve({ token, secret })
    })
  })

  return `https://api.twitter.com/oauth/authorize?oauth_token=${token}`

}

export default authorize
