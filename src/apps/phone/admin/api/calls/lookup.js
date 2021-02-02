import CallSerializer from '@apps/maha/serializers/call_serializer'
import { getCall } from '@apps/maha/services/calls'
import twilio from '@core/vendor/twilio'

const lookupRoute = async (req, res) => {

  const current = await twilio.calls(req.body.sid).fetch()

  const parent = current.parentCallSid ? await twilio.calls(current.parentCallSid).fetch() : current

  const main = parent.parentCallSid ? await twilio.calls(parent.parentCallSid).fetch() : parent

  const call = await getCall(req, {
    sid: main.sid
  })

  await call.load(['from_number','to_number','program.phone_number','program.logo','phone_number.contact.photo'], {
    transacting: req.trx
  })

  res.status(200).respond({
    parent_sid: parent.sid,
    call: CallSerializer(req, call)
  })

}

export default lookupRoute
