import CallSerializer from '@apps/maha/serializers/call_serializer'
import { getPhoneNumber } from '@apps/crm/services/phone_numbers'
import PhoneNumber from '@apps/maha/models/phone_number'
import Number from '@apps/maha/models/number'
import Call from '@apps/maha/models/call'
import twilio from '@core/vendor/twilio'
import moment from 'moment'

const getContactPhoneNumber = async (req, { number }) => {
  if(!/^\+\d{11}$/.test(number)) return null
  return await getPhoneNumber(req, {
    number
  })
}

const getCell = async (req, { config, from}) => {
  const twcall = await twilio.calls.create({
    url: `${process.env.TWILIO_TWIML_HOST}/call?config=${config}`,
    statusCallback: `${process.env.TWILIO_TWIML_HOST}/status`,
    statusCallbackEvent: ['initiated','ringing','answered','completed'],
    to: req.user.get('cell_phone'),
    from
  })
  return twcall.sid
}

const createRoute = async (req, res) => {

  const sid = req.body.client === 'cell' ? await getCell(req, {
    config: req.body.config,
    from: req.body.from
  }) : req.body.sid

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('number', req.body.from)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  const from = await Number.fetchOrCreate({
    number: req.body.from
  }, {
    transacting: req.trx
  })

  const to = await Number.fetchOrCreate({
    number: req.body.to
  }, {
    transacting: req.trx
  })

  const contact_phone_number = await getContactPhoneNumber(req, {
    number: req.body.to
  })

  const call = await Call.forge({
    team_id: req.team.get('id'),
    from_id: from.get('id'),
    to_id: to.get('id'),
    direction: req.body.direction,
    sid,
    received_at: null,
    sent_at: moment(),
    status: 'initiated',
    program_id: phone_number.related('program').get('id'),
    phone_number_id: contact_phone_number ? contact_phone_number.get('id') : null
  }).save(null, {
    transacting: req.trx
  })

  await call.load(['from','to','program.logo','program.phone_number','phone_number.contact.photo'], {
    transacting: req.trx
  })

  res.status(200).respond(call, CallSerializer)

}

export default createRoute
