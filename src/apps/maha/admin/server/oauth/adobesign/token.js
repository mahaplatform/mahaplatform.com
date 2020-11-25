import request from 'request-promise'

const token = async ({ api_access_point, code }, scope) => {

  const host = process.env.WEB_HOST

  const redirect_uri = `${host}/admin/oauth/adobesign/token`

  const data = await request({
    method: 'POST',
    uri: `${api_access_point}/oauth/token`,
    form: {
      grant_type: 'authorization_code',
      client_id: process.env.ADOBE_SIGN_CLIENT_ID,
      client_secret: process.env.ADOBE_SIGN_CLIENT_SECRET,
      redirect_uri: redirect_uri,
      code
    }
  }).then(result => JSON.parse(result))

  const profile = await request({
    method: 'GET',
    uri: `${api_access_point}/api/rest/v6/users/me`,
    headers: {
      'Authorization': `Bearer ${data.access_token}`
    }
  }).then(result => JSON.parse(result))

  return [{
    profile_id: profile.id,
    name: `${profile.first_name} ${profile.last_name}`,
    username: profile.email,
    data: {
      ...data
    }
  }]

}

export default token
