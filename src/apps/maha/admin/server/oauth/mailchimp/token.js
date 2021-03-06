import request from 'request-promise'

const token = async ({ code }, scope) => {

  const host = process.env.NODE_ENV === 'production' ? process.env.ADMIN_HOST : process.env.ADMIN_HOST.replace(process.env.DOMAIN, '127.0.0.1')

  const redirect_uri = `${host}/admin/oauth/mailchimp/token`

  const data = await request({
    method: 'POST',
    uri: 'https://login.mailchimp.com/oauth2/token',
    form: {
      grant_type: 'authorization_code',
      client_id: process.env.MAILCHIMP_CLIENT_ID,
      client_secret: process.env.MAILCHIMP_CLIENT_SECRET,
      redirect_uri: redirect_uri,
      code
    }
  }).then(result => JSON.parse(result))

  const metadata = await request({
    method: 'GET',
    uri: 'https://login.mailchimp.com/oauth2/metadata',
    headers: {
      'Authorization': `OAuth ${data.access_token}`
    },
    query: {
      fields: 'account_id'
    },
    json: true
  })

  const profile = await request({
    method: 'GET',
    uri: `https://${metadata.dc}.api.mailchimp.com/3.0`,
    headers: {
      'Authorization': `OAuth ${data.access_token}`
    },
    json: true
  })

  return [{
    photo_url: profile.avatar_url,
    profile_id: profile.account_id,
    name: `${profile.first_name} ${profile.last_name}`,
    username: profile.username,
    data: {
      ...data,
      dc: metadata.dc
    }
  }]

}

export default token
