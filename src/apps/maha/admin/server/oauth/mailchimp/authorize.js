import qs from 'qs'

const authorize = async (req, { scope, state }) => {

  const host = process.env.NODE_ENV === 'production' ? process.env.WEB_HOST : process.env.WEB_HOST.replace(process.env.DOMAIN, '127.0.0.1')

  const redirect_uri = `${host}/admin/oauth/mailchimp/token`

  const query = qs.stringify({
    response_type: 'code',
    client_id: process.env.MAILCHIMP_CLIENT_ID,
    redirect_uri: redirect_uri,
    state
  })


  return `https://login.mailchimp.com/oauth2/authorize?${query}`

}

export default authorize
