import qs from 'qs'

const authorize = async (req, { scope, state }) => {

  const query = qs.stringify({
    response_type: 'code',
    client_id: process.env.BOX_CLIENT_ID,
    redirect_uri: `${process.env.WEB_HOST}/admin/box/token`,
    state
  })

  return `https://account.box.com/api/oauth2/authorize?${query}`

}

export default authorize
