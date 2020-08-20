import qs from 'qs'

const authorize = async (req, { scope, state }) => {

  const host = process.env.NODE_ENV === 'production' ? process.env.WEB_HOST : process.env.WEB_HOST.replace(process.env.DOMAIN, '127.0.0.1')

  const redirect_uri = `${host}/admin/oauth/qualtrics/token`

  // TODO cleanup url building, don't encode strings as per Qualtrics docs
  const query = qs.stringify({
    response_type: 'code',
    client_id: process.env.QUALTRICS_CLIENT_ID,
    redirect_uri: redirect_uri,
    scope: 'offline',
    state
  })

  // temp hardcode url
  return 'https://cornell.ca1.qualtrics.com/oauth2/auth?client_id=UR_3wIbcgJuqf6s4IZ|SKGDJwCUa2vJ&response_type=code&scope=offline&state=e41ae573957c424b93ed9d6b37545863&redirect_uri=https://google.com'
}

export default authorize
