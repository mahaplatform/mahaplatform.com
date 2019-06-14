import { getUnread } from '../../../services/messages'

const listRoute = async (req, res) => {

  const unread = await getUnread(req.user.get('id'), req.trx)

  res.status(200).respond(unread)

}

export default listRoute
