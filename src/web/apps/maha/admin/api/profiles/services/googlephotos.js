import request from 'request-promise'
import moment from 'moment'

export const getClient = async (req, profile) => {

  const expires = moment(Math.floor(profile.get('data').expiry_date / 1000))

  if(expires.diff(moment()) <= 0) {

    const data = await request.post('https://www.googleapis.com/oauth2/v4/token', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        refresh_token: profile.get('data').refresh_token,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: 'refresh_token'
      },
      json: true
    })

    await profile.save({
      data
    }, {
      patch: true,
      transacting: req.trx
    })

  }

  return profile
}
