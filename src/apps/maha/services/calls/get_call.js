import { getPhoneNumber } from '@apps/crm/services/phone_numbers'
import { contactActivity } from '@apps/crm/services/activities'
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

const getProgramPhoneNumber = async (req, { number, sid }) => {
  return await PhoneNumber.query(qb => {
    if(number) qb.where('number', number)
    if(sid) qb.where('sid', sid)
  }).fetch({
    withRelated: ['program','team'],
    transacting: req.trx
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

  const phone_number = await getProgramPhoneNumber(req, {
    sid: twcall.phoneNumberSid,
    number: twcall.To
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

  const newcall = await Call.forge({
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

  if(twcall.direction === 'inbound') {

    await newcall.load(['phone_number.contact'], {
      transacting: req.trx
    })

    await contactActivity(req, {
      contact: newcall.related('phone_number').related('contact'),
      type: 'call',
      story: 'called program',
      program_id: newcall.get('program_id'),
      data: {
        call_id: newcall.get('id')
      }
    })
  }

  return newcall

}

export default getCall
