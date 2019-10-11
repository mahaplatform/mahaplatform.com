import Number from '../../../../apps/maha/models/number'
import socket from '../../../services/routes/emitter'
import Fax from '../../../../apps/maha/models/fax'
import twilio from '../../../services/twilio'
import { twiml } from 'twilio'

const redirectRoute = async (req, res) => {

  const { FaxSid } = req.body

  const incoming = await twilio.fax.faxes(FaxSid).fetch()

  const { direction, from, to, sid, status } = incoming

  const number = await Number.query(qb => {
    qb.where('number', to)
  }).fetch({
    transacting: req.trx
  })

  await Fax.forge({
    team_id: number.get('team_id'),
    number_id: number.get('id'),
    type: direction,
    from,
    sid,
    status
  }).save(null, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/team/faxes'
  ])

  const response = new twiml.FaxResponse()

  response.receive({
    method: 'POST',
    action: `${process.env.TWIML_HOST}/fax/update`,
    storeMedia: false
  })

  res.status(200).type('application/xml').send(response.toString())

}

export default redirectRoute
