import PhoneNumber from '../../models/phone_number'
import User from '../../../maha/models/user'
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

  const response = new twiml.VoiceResponse()

  const dial = response.dial({
    callerId: call.related('from').get('number')
  })

  dial.number(call.related('to').get('number'))

  return response.toString()

}

export default makeHook
