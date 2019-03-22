import { Route } from '../../../../server'
import qs from 'qs'

const processor = async (req, trx, options) => {

  const query = qs.stringify({
    response_type: 'code',
    client_id: process.env.BOX_CLIENT_ID,
    redirect_uri: `${process.env.WEB_HOST}/admin/box/token`,
    state: req.user.get('id')
  })

  return `https://account.box.com/api/oauth2/authorize?${query}`

}

const authorizeRoute = new Route({
  method: 'get',
  path: '/box/authorize',
  processor
})

export default authorizeRoute
