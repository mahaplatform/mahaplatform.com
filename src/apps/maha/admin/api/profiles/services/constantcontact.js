import request from 'request-promise'

export const getClient = (req, profile) => {

  return async ({ method, path, query, body }) =>  {

    const data = profile.get('data')

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
