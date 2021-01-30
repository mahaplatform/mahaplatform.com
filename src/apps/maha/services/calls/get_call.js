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

  const from_number = params.from || twcall.from
  const to_number = params.to || twcall.to
  const direction = params.direction || twcall.direction

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('number', direction === 'outbound' ? from_number : to_number)
  }).fetch({
    withRelated: ['program','team'],
    transacting: req.trx
  })

  req.team = phone_number.related('team')

  const from = await Number.fetchOrCreate({
    number: from_number
  }, {
    transacting: req.trx
  })

  const to = await Number.fetchOrCreate({
    number: to_number
  }, {
    transacting: req.trx
  })

  const contact_phone_number = await getContactPhoneNumber(req, {
    number: direction === 'inbound' ? from_number : to_number
  })

  return await Call.forge({
    team_id: req.team.get('id'),
    from_id: from.get('id'),
    to_id: to.get('id'),
    direction,
    sid: twcall.sid,
    received_at: direction === 'inbound' ? twcall.startTime : null,
    sent_at: direction === 'outbound' ? twcall.startTime : null,
    status: twcall.status,
    program_id: phone_number.related('program').get('id'),
    phone_number_id: contact_phone_number ? contact_phone_number.get('id') : null
  }).save(null, {
    transacting: req.trx
  })

}

export default getCall
