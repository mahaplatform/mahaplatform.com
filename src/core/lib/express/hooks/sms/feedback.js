import { updateSMS } from '../../../../../apps/maha/services/smses'
import socket from '../../../../services/routes/emitter'

const feedbackRoute = async (req, res) => {

  const { MessageSid, MessageStatus } = req.body

  await updateSMS(req, {
    sid: MessageSid,
    status: MessageStatus
  })

  await socket.refresh(req, [
    '/admin/team/smses'
  ])

  res.status(200).send(true)

}

export default feedbackRoute
