import rp from 'request-promise'

const request = (profile) => async (req, { method, endpoint, body, form, formData }) => {
  const { api_access_point, access_token } = profile.get('data')
  return await rp({
    method,
    uri: `${api_access_point}${endpoint}`,
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
    ...body ? { body } : {},
    ...form ? { form } : {},
    ...formData ? { formData } : {},
    json: true
  })
}


export const getClient = async (req, profile) => {

  const data = await request(profile)(req, {
    method: 'POST',
    endpoint: 'oauth/refresh',
    form: {
      refresh_token: profile.get('data').refresh_token,
      grant_type: 'refresh_token',
      client_id: process.env.ADOBE_SIGN_CLIENT_ID,
      client_secret: process.env.ADOBE_SIGN_CLIENT_SECRET
    }
  })

  await profile.save({
    data: {
      ...profile.get('data'),
      ...data
    }
  }, {
    transacting: req.trx,
    patch: true
  })

  return {
    request: request(profile)
  }

}
