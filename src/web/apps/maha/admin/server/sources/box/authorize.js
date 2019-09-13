import qs from 'qs'

const authorize = async (req, res) => {

  const query = qs.stringify({
    response_type: 'code',
    client_id: process.env.BOX_CLIENT_ID,
    redirect_uri: `${process.env.WEB_HOST}/admin/box/token`,
    state: req.user.get('id')
  })

  const url = `https://account.box.com/api/oauth2/authorize?${query}`

  return url

}

export default authorize
