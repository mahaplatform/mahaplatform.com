import { activity } from '../../../../../core/services/routes/activities'
import PhoneNumberSerializer from '../../../serializers/phone_number_serializer'
import socket from '../../../../../core/services/routes/emitter'
import twilio from '../../../../../core/services/twilio'
import PhoneNumber from '../../../../maha/models/phone_number'

const createRoute = async (req, res) => {

  const number = await twilio.incomingPhoneNumbers.create({
    phoneNumber: req.body.number.phoneNumber,
    friendlyName: `${req.team.get('subdomain')} ${req.body.type}`,
    smsMethod: 'POST',
    smsUrl: `${process.env.TWIML_HOST}/sms`,
    voiceMethod: 'POST',
    voiceUrl: `${process.env.TWIML_HOST}/${req.body.type}`,
    voiceReceiveMode: req.body.type,
    statusMethod: 'POST',
    statusCallback: `${process.env.TWIML_HOST}/${req.body.type}/status`
  })

  const phone_number = await PhoneNumber.forge({
    team_id: req.team.get('id'),
    sid: number.sid,
    type: req.body.type,
    number: req.body.number.phoneNumber,
    locality: req.body.number.locality,
    region: req.body.number.region
  }).save(null, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/team/phone_numbers'
  ])

  await activity(req, {
    story: 'provisioned {object}',
    object: phone_number
  })

  res.status(200).respond(phone_number, PhoneNumberSerializer)

}

export default createRoute
