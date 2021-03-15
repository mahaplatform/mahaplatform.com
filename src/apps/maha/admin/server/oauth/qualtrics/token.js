import request from 'request-promise'

const getProfile = async ({ access_token }) => {

  const result = await request({
    method: 'GET',
    uri: 'https://cornell.ca1.qualtrics.com/API/v3/whoami',
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  }).then(result => JSON.parse(result))

  return result.result

}

const token = async ({ code }, scope) => {

  const host = process.env.ADMIN_HOST

  const redirect_uri = `${host}/admin/oauth/qualtrics/token`

  const data = await request({
    method: 'POST',
    uri: 'https://cornell.ca1.qualtrics.com/oauth2/token',
    form: {
      grant_type: 'authorization_code',
      client_id: process.env.QUALTRICS_CLIENT_ID,
      client_secret: process.env.QUALTRICS_CLIENT_SECRET,
      redirect_uri: redirect_uri,
      code
    }
  }).then(result => JSON.parse(result))

  const profile = await getProfile({
    access_token: data.access_token
  })

  return [{
    profile_id: profile.userId,
    name: `${profile.firstName} ${profile.lastName}`,
    username: profile.email,
    data
  }]

}

export default token
