import qs from 'qs'

const authorizeRoute = async (req, res) => {

  const query = qs.stringify({
    response_type: 'code',
    client_id: process.env.BOX_CLIENT_ID,
    redirect_uri: `${process.env.WEB_HOST}/admin/box/token`,
    state: req.user.get('id')
  })

  const url = `https://account.box.com/api/oauth2/authorize?${query}`

  res.status(200).respond(url)

}

export default authorizeRoute
