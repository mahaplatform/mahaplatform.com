import { OAuth } from 'oauth'

const token = async ({ oauth_token, oauth_verifier }, scope) => {

  var oauth = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.TWITTER_API_KEY,
    process.env.TWITTER_API_SECRET_KEY,
    '1.0',
    '',
    'HMAC-SHA1'
  )

  const { access_token_key, access_token_secret } = await new Promise((resolve, reject) => {
    oauth.getOAuthAccessToken(
      oauth_token,
      process.env.TWITTER_API_KEY,
      oauth_verifier,
      function (err, access_token_key, access_token_secret) {
        if(err) reject(err)
        resolve({ access_token_key, access_token_secret })
      }
    )
  })

  const profile = await new Promise((resolve, reject) => {
    oauth.get(
      'https://api.twitter.com/1.1/account/verify_credentials.json',
      access_token_key,
      access_token_secret,
      function(err, data) {
        if(err) reject(err)
        resolve(JSON.parse(data))
      }
    )
  })

  return [{
    photo_url: profile.profile_image_url_https,
    profile_id: profile.id,
    name: profile.name,
    username: profile.screen_name,
    data: { access_token_key, access_token_secret }
  }]

}

export default token
