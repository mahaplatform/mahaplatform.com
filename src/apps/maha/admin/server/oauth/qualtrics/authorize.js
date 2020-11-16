import qs from 'qs'

const authorize = async (req, { scope, state }) => {

  const host = process.env.WEB_HOST

  const redirect_uri = `${host}/admin/oauth/qualtrics/token`

  const query = qs.stringify({
    response_type: 'code',
    client_id: process.env.QUALTRICS_CLIENT_ID,
    scope: 'offline',
    redirect_uri,
    state
  }, { encodeURIComponent: uri => uri }) // don't encode uri as per Qualtrics docs

  return `https://cornell.ca1.qualtrics.com/oauth2/auth?${query}`
}

export default authorize
