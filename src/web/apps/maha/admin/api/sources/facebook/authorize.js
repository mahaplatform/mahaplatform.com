import { Route } from '../../../../../../core/backframe'
import { Facebook } from 'fb'

const fb = new Facebook({
  appId: process.env.FACEBOOK_APP_ID,
  appSecret: process.env.FACEBOOK_APP_SECRET,
  Promise
})

const processor = async (req, trx, options) => {

  const response = await fb.getLoginUrl({
    scope: 'user_photos',
    redirect_uri: `${process.env.WEB_HOST}/admin/facebook/token`,
    state: req.user.get('id')
  })

  return response

}

const authorizeRoute = new Route({
  method: 'get',
  path: '/facebook/authorize',
  processor
})

export default authorizeRoute
