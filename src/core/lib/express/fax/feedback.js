import { updateFax } from '../../../../apps/maha/services/faxes'
import socket from '../../../services/routes/emitter'
import twilio from '../../../services/twilio'

const feedbackRoute = async (req, res) => {

  const fax = await twilio.fax.faxes(req.body.FaxSid).fetch()

  await updateFax(req, {
    price: Math.abs(fax.price),
    sid: fax.sid,
    status: fax.status
  })

  await socket.refresh(req, [
    '/admin/fax/faxes/outgoing',
    '/admin/team/faxes'
  ])

  res.status(200).send(true)

}

export default feedbackRoute
