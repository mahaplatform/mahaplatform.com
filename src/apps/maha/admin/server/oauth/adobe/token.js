import request from 'request-promise'

const token = async ({ code }, scope) => {

  const host = process.env.WEB_HOST

  const redirect_uri = `${host}/admin/oauth/adobe/token`

  const data = await request({
    method: 'POST',
    uri: 'http://api.adobesign.com/oauth/token',
    form: {
      grant_type: 'authorization_code',
      client_id: process.env.ADOBE_CLIENT_ID,
      client_secret: process.env.ADOBE_CLIENT_SECRET,
      redirect_uri: redirect_uri,
      code
    }
  }).then(result => JSON.parse(result))

  return [{
    // TODO: get profile fields
    profile_id: 'id',
    name: 'name',
    username: 'username',
    data: {
      ...data
    }
  }]

}

export default token
