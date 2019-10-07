import request from 'request-promise'

export const getClient = (req, profile) => {

  return async ({ method, path, query, body }) =>  {

    const data = profile.get('data')

    const { dc, access_token } = data

    return await request({
      method,
      uri: `https://${dc}.api.mailchimp.com/3.0${path}`,
      headers: {
        'Authorization': `OAuth ${access_token}`
      },
      qs: query,
      body,
      json: true
    })

  }

}
