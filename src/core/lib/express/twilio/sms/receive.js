import { getPhoneNumber } from '@apps/crm/services/phone_numbers'
import PhoneNumber from '@apps/maha/models/phone_number'
import { receiveSMS } from '@apps/maha/services/smses'
import { executeHooks } from '@core/services/hooks'
import socket from '@core/services/routes/emitter'
import Twilio from 'twilio'
import _ from 'lodash'

const receiveRoute = async (req, res) => {

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('number', req.body.To)
    qb.orderBy('id', 'asc')
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  req.team = phone_number.related('team')

  const sms = await receiveSMS(req, {
    from_number: req.body.From,
    to_number: req.body.To,
    body: req.body.Body.trim(),
    incoming: req.body,
    sid: req.body.CallSid
  })

  await sms.load(['from_number','to_number'], {
    transacting: req.trx
  })

  const from = await getPhoneNumber(req, {
    number: sms.related('from_number').get('number')
  })

  const term = sms.get('body').toLowerCase()

  if(_.includes(['start','unstop'], term)) {
    await executeHooks(req, 'sms-optin', {
      from,
      phone_number,
      sms,
      twiml
    })
  }

  if(_.includes(['stop','stopall','unsubscribe','cancel','end','quit'], term)) {
    await executeHooks(req, 'sms-outout', {
      from,
      phone_number,
      sms,
      twiml
    })
  }

  const twiml = new Twilio.twiml.MessagingResponse()

  await executeHooks(req, 'sms-receive', {
    from,
    phone_number,
    sms,
    twiml
  })

  await socket.refresh(req, [
    '/admin/team/sms'
  ])

  return res.status(200).type('text/xml').send(twiml.toString())

}

export default receiveRoute
