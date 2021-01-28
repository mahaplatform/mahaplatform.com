import CallSerializer from '@apps/phone/serializers/call_serializer'
import { getCall } from '@apps/maha/services/calls'
import twilio from '@core/vendor/twilio'

const lookupRoute = async (req, res) => {

  const twcall = await twilio.calls(req.body.sid).fetch()

  const call = await getCall(req, {
    sid: twcall.parentCallSid || twcall.sid
  })

  await call.load(['from','to','program.phone_number','program.logo','phone_number.contact.photo'], {
    transacting: req.trx
  })

  res.status(200).respond(call, CallSerializer)

}

export default lookupRoute
