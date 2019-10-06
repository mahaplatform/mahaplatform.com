import { OAuth } from 'oauth'

export const getClient = async (req, profile) => {

  var oauth = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.TWITTER_API_KEY,
    process.env.TWITTER_API_SECRET_KEY,
    '1.0',
    '',
    'HMAC-SHA1'
  )

  return async (method, path) => {
    return await new Promise((resolve, reject) => {
      oauth[method](
        `https://api.twitter.com/1.1/${path}.json`,
        profile.get('data').access_token_key,
        profile.get('data').access_token_secret,
        function(err, data) {
          if(err) reject(err)
          resolve(JSON.parse(data))
        }
      )
    })
  }

}
