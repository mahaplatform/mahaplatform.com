import { getUnread } from '../../../services/messages'
import { Route } from 'maha'

const processor = async (req, trx,options) => {

  return await getUnread(req.user.get('id'), trx)

}

const unreadRoute = new Route({
  method: 'get',
  path: '/unread',
  processor
})

export default unreadRoute
