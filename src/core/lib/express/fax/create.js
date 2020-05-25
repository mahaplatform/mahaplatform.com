import PhoneNumber from '../../../../apps/maha/models/phone_number'
import { createFax } from '../../../../apps/maha/services/faxes'
import socket from '../../../services/routes/emitter'
import twilio from '../../../services/twilio'
import { twiml } from 'twilio'

const createRoute = async (req, res) => {

  const { FaxSid } = req.body

  const incoming = await twilio.fax.faxes(FaxSid).fetch()

  const { direction, from, to, sid, status } = incoming

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('number', to)
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  req.team = phone_number.related('team')

  await createFax(req, {
    team_id: phone_number.get('team_id'),
    direction,
    from,
    to,
    sid,
    status
  })

  const response = new twiml.FaxResponse()

  response.receive({
    method: 'POST',
    action: `${process.env.TWIML_HOST}/fax/receive`
  })

  await socket.refresh(req, [
    '/admin/fax/faxes/incoming',
    '/admin/team/faxes'
  ])

  res.status(200).type('application/xml').send(response.toString())

}

export default createRoute
