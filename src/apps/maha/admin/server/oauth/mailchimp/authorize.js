import qs from 'qs'

const authorize = async (req, { scope, state }) => {

  const redirect_uri = `${process.env.WEB_HOST}/admin/mailchimp/token`

  const query = qs.stringify({
    response_type: 'code',
    client_id: process.env.MAILCHIMP_CLIENT_ID,
    redirect_uri: redirect_uri.replace('localhost', '127.0.0.1'),
    state
  })

  return `https://login.mailchimp.com/oauth2/authorize?${query}`

}

export default authorize
