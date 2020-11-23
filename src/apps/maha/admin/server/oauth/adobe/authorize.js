import qs from 'qs'

const authorize = async (req, { scope, state }) => {

  const host = process.env.WEB_HOST

  const redirect_uri = `${host}/admin/oauth/qualtrics/token`

  const query = qs.stringify({
    redirect_uri,
    response_type: 'code',
    client_id: process.env.ADOBE_CLIENT_ID,
    scope: scope.join(':'),
    state
  })

  return `https://secure.adobesign.com/public/oauth?${query}`
}

export default authorize
