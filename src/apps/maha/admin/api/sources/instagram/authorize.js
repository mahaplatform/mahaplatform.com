import { Route } from '../../../../server'
import Instagram from 'instagram-node'

const ig = new Instagram.instagram()

ig.use({
  client_id: process.env.INSTAGRAM_CLIENT_ID,
  client_secret: process.env.INSTAGRAM_CLIENT_SECRET
})

const redirect_uri = `${process.env.WEB_HOST}/admin/instagram/token`

const processor = async (req, trx, options) => {

  const response = await ig.get_authorization_url(redirect_uri, {
    scope: 'basic',
    state: req.user.get('id')
  })
  return response

}

const authorizeRoute = new Route({
  method: 'get',
  path: '/instagram/authorize',
  processor
})

export default authorizeRoute
