import { activity } from '@core/services/routes/activities'
import PhoneNumberSerializer from '../../../serializers/phone_number_serializer'
import socket from '@core/services/routes/emitter'
import twilio from '@core/services/twilio'
import PhoneNumber from '../../../../maha/models/phone_number'

const createRoute = async (req, res) => {

  const number = await twilio.incomingPhoneNumbers.create({
    phoneNumber: req.body.number.phoneNumber,
    smsMethod: 'POST',
    smsUrl: `${process.env.TWIML_HOST}/sms`,
    voiceMethod: 'POST',
    voiceUrl: `${process.env.TWIML_HOST}/fax`,
    voiceReceiveMode: req.body.type,
    statusMethod: 'POST',
    statusCallback: `${process.env.TWIML_HOST}/fax/status`
  })

  const phone_number = await PhoneNumber.forge({
    team_id: req.team.get('id'),
    sid: number.sid,
    type: req.body.type,
    program_id: req.body.program_id,
    number: req.body.number.phoneNumber,
    locality: req.body.number.locality,
    region: req.body.number.region
  }).save(null, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/fax/numbers'
  ])

  await activity(req, {
    story: 'provisioned {object}',
    object: phone_number
  })

  res.status(200).respond(phone_number, PhoneNumberSerializer)

}

export default createRoute
