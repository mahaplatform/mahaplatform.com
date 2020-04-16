import request from 'request-promise'

const token = async ({ code }, scope) => {

  const data = await request({
    method: 'POST',
    uri: 'https://idfed.constantcontact.com/as/token.oauth2',
    form: {
      grant_type: 'authorization_code',
      client_id: process.env.CONSTANTCONTACT_API_KEY,
      client_secret: process.env.CONSTANTCONTACT_API_SECRET,
      redirect_uri: `${process.env.WEB_HOST}/admin/oauth/constantcontact/token`,
      code
    }
  }).then(result => JSON.parse(result))

  const profile = await request({
    method: 'GET',
    uri: 'https://api.cc.email/v3/account/summary',
    headers: {
      'Authorization': `Bearer ${data.access_token}`
    },
    qs: {
      extra_fields: 'company_logo'
    },
    json: true
  })

  return [{
    photo_url: profile.company_logo ? profile.company_logo.external_url : null,
    profile_id: profile.encoded_account_id,
    name: `${profile.first_name} ${profile.last_name}`,
    username: profile.organization_name,
    data: {
      code,
      ...data
    }
  }]

}

export default token
