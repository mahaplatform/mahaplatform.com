import CallSerializer from '@apps/phone/serializers/call_serializer'
import { getCall } from '@apps/maha/services/calls'
import twilio from '@core/vendor/twilio'

const getParent = async (sid) => {
  const twcall = await twilio.calls(sid).fetch()
  if(!twcall.parentCallSid) return twcall
  return await getParent(twcall.parentCallSid)
}

const lookupRoute = async (req, res) => {

  const twcall = await getParent(req.body.sid)

  const call = await getCall(req, {
    sid: twcall.sid
  })

  await call.load(['from','to','program.phone_number','program.logo','phone_number.contact.photo'], {
    transacting: req.trx
  })

  res.status(200).respond(call, CallSerializer)

}

export default lookupRoute
