import { receiveFax } from '@apps/maha/services/faxes'
import socket from '../../../services/routes/emitter'
import twilio from '../../../vendor/twilio'

const receiveRoute = async (req, res) => {

  const { FaxSid } = req.body

  const incoming = await twilio.fax.faxes(FaxSid).fetch()

  const { mediaUrl, num_pages, price, sid, status } = incoming

  await receiveFax(req, {
    mediaUrl,
    num_pages,
    price,
    sid,
    status
  })

  await socket.refresh(req, [
    '/admin/fax/faxes/incoming',
    '/admin/team/faxes'
  ])

  res.status(200).send(null)

}

export default receiveRoute
