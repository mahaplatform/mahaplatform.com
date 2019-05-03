import { Route } from '../../../../../../core/backframe'
import Dropbox from 'dropbox-v2-api'

const dropbox = new Dropbox.authenticate({
  client_id: process.env.DROPBOX_APP_KEY,
  client_secret: process.env.DROPBOX_APP_SECRET,
  redirect_uri: `${process.env.WEB_HOST}/admin/dropbox/token`
})

const processor = async (req, trx, options) => {

  const url = await dropbox.generateAuthUrl()

  return `${url}&state=${req.user.get('id')}`

}

const authorizeRoute = new Route({
  method: 'get',
  path: '/dropbox/authorize',
  processor
})

export default authorizeRoute
