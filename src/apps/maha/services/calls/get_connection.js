import { getPhoneNumber } from '@apps/crm/services/phone_numbers'
import CallConnection from '@apps/maha/models/call_connection'
import PhoneNumber from '@apps/maha/models/phone_number'
import Number from '@apps/maha/models/number'
import User from '@apps/maha/models/user'
import twilio from '@core/vendor/twilio'

const getSource = async (req, params) => {

  if(!params.number) return {}

  const number = await Number.fetchOrCreate({
    number: params.number
  }, {
    transacting: req.trx
  })

  const matches = params.number.match(/^client:(\d+)$/)

  if(matches) {

    const user = await User.query(qb => {
      qb.where('id', matches[1])
    }).fetch({
      transacting: req.trx
    })

    return { number, user }

  }

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('number', params.number)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  if(phone_number) {
    return {
      number,
      program: phone_number.related('program')
    }
  }

  const contact_phone_number = await getPhoneNumber(req, {
    number: params.number
  })

  if(contact_phone_number) {
    return {
      number,
      phone_number: contact_phone_number
    }
  }

  return {}

}

const getCallConnection = async (req, { call, sid }) => {

  const connection = await CallConnection.where(qb => {
    qb.where('sid', sid)
  }).fetch({
    transacting: req.trx
  })

  if(connection) return connection

  const twcall = await twilio.calls(sid).fetch()

  console.log(twcall)

  const from = await getSource(req, {
    number: twcall.from
  })

  const to = await getSource(req, {
    number: twcall.to
  })

  return await CallConnection.forge({
    team_id: req.team.get('id'),
    call_id: call.get('id'),
    from_number_id: from.number ? from.number.get('id') : null,
    to_number_id: to.number ? to.number.get('id') : null,
    from_program_id: from.program ? from.program.get('id') : null,
    to_program_id: to.program ? to.program.get('id') : null,
    from_user_id: from.user ? from.user.get('id') : null,
    to_user_id: to.user ? to.user.get('id') : null,
    from_phone_number_id: from.phone_number ? from.phone_number.get('id') : null,
    to_phone_number_id: to.phone_number ? to.phone_number.get('id') : null,
    direction: twcall.direction,
    sid
  }).save(null, {
    transacting: req.trx
  })

}

export default getCallConnection
