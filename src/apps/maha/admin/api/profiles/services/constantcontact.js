import request from 'request-promise'
import btoa from 'btoa'

export const getClient = (req, profile) => {

  return async ({ method, path, query, body }) =>  {

    const { refresh_token } = profile.get('data')

    const token = btoa(`${process.env.CONSTANTCONTACT_API_KEY}:${process.env.CONSTANTCONTACT_API_SECRET}`)

    const data = await request({
      method: 'POST',
      uri: 'https://idfed.constantcontact.com/as/token.oauth2',
      headers: {
        'Authorization': `Basic ${token}`
      },
      qs: {
        refresh_token,
        grant_type: 'refresh_token'
      },
      json: true
    })

    await profile.save({
      data
    }, {
      transacting: req.trx
    })

    return await request({
      method: 'GET',
      uri: `https://api.cc.email/v3${path}`,
      headers: {
        'Authorization': `Bearer ${data.access_token}`
      },
      qs: query,
      body,
      json: true
    })

  }

}
