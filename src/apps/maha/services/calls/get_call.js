import { getPhoneNumber } from '@apps/crm/services/phone_numbers'
import PhoneNumber from '@apps/maha/models/phone_number'
import Number from '@apps/maha/models/number'
import Call from '@apps/maha/models/call'
import twilio from '@core/vendor/twilio'

const getContactPhoneNumber = async (req, { number }) => {
  if(!/^\+\d{11}$/.test(number)) return null
  return await getPhoneNumber(req, {
    number
  })
}

const getCall = async(req, params) => {

  const call = await Call.where(qb => {
    qb.where('sid', params.sid)
  }).fetch({
    transacting: req.trx
  })

  if(call) return call

  const twcall = await twilio.calls(params.sid).fetch()

  // console.log(twcall)

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('sid', twcall.phoneNumberSid)
  }).fetch({
    withRelated: ['program','team'],
    transacting: req.trx
  })

  req.team = phone_number.related('team')

  const from_number = await Number.fetchOrCreate({
    number: twcall.from
  }, {
    transacting: req.trx
  })

  const to_number = await Number.fetchOrCreate({
    number: twcall.to
  }, {
    transacting: req.trx
  })

  const contact_phone_number = await getContactPhoneNumber(req, {
    number: twcall.direction === 'inbound' ? twcall.from : twcall.to
  })

  return await Call.forge({
    team_id: req.team.get('id'),
    from_number_id: from_number.get('id'),
    to_number_id: to_number.get('id'),
    direction: twcall.direction,
    sid: twcall.sid,
    received_at: twcall.direction === 'inbound' ? twcall.startTime : null,
    sent_at: twcall.direction === 'outbound' ? twcall.startTime : null,
    status: twcall.status,
    program_id: phone_number.related('program').get('id'),
    phone_number_id: contact_phone_number ? contact_phone_number.get('id') : null
  }).save(null, {
    transacting: req.trx
  })

}

export default getCall
