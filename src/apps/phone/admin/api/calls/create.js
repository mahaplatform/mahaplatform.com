import CallSerializer from '@apps/phone/serializers/call_serializer'
import { getCall } from '@apps/maha/services/calls'
import twilio from '@core/vendor/twilio'

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

  const { config, from, direction, to, type } = req.body

  const sid = type === 'outbound-cell' ? await getCell(req, {
    config,
    from
  }) : req.body.sid

  const call = await getCall(req, {
    sid,
    direction,
    from,
    to
  })

  await call.load(['from','to','program.logo','program.phone_number','phone_number.contact.photo'], {
    transacting: req.trx
  })

  res.status(200).respond(call, CallSerializer)

}

export default createRoute
