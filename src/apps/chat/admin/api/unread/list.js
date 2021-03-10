import { getUnread } from '@apps/chat/services/messages'

const listRoute = async (req, res) => {

  const unread = await getUnread(req, req.user.get('id'))

  await res.status(200).respond(unread)

}

export default listRoute
