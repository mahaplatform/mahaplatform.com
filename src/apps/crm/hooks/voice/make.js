import socket from '../../../../core/services/routes/emitter'
import PhoneNumber from '../../models/phone_number'
import { twiml } from 'twilio'

const makeHook = async (req, { call, phone_number, user_id }) => {

  const to = await PhoneNumber.query(qb => {
    qb.where('number', call.related('to').get('number'))
  }).fetch({
    withRelated: ['contact'],
    transacting: req.trx
  })

  await phone_number.load(['program'], {
    transacting: req.trx
  })

  await call.save({
    program_id: phone_number.related('program').get('id'),
    phone_number_id: to.get('id')
  },{
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/crm/contacts/${to.get('contact_id')}/channels/programs/${phone_number.related('program').get('id')}/voice/${to.get('id')}/calls`
  ])

  const response = new twiml.VoiceResponse()

  const dial = response.dial({
    callerId: call.related('from').get('number')
  })

  dial.number(call.related('to').get('number'))

  return response.toString()

}

export default makeHook
