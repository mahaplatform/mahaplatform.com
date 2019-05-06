import { Plugin } from '../../../backframe'
import App from '../../../../apps/maha/models/app'

const alterRequest = async (req, trx, options) => {

  if(!options.app_id) return req

  req.app = await App.where({ id: options.app_id }).fetch({ transacting: trx })

  return req

}

const appPlugin = new Plugin({
  name: 'app',
  alterRequest
})

export default appPlugin
