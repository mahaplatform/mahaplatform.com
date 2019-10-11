import { activity } from '../../../../../core/services/routes/activities'
import NumberSerializer from '../../../serializers/number_serializer'
import socket from '../../../../../core/services/routes/emitter'
import twilio from '../../../../../core/services/twilio'
import Number from '../../../../maha/models/number'

const createRoute = async (req, res) => {

  const phone_number = await twilio.incomingPhoneNumbers.create({
    phoneNumber: req.body.number.phoneNumber,
    smsMethod: 'POST',
    smsUrl: `${process.env.TWIML_HOST}/sms`,
    voiceMethod: 'POST',
    voiceUrl: `${process.env.TWIML_HOST}/${req.body.type}`,
    voiceReceiveMode: req.body.type,
    statusMethod: 'POST',
    statusCallback: `${process.env.TWIML_HOST}/${req.body.type}/status`
  })

  const number = await Number.forge({
    team_id: req.team.get('id'),
    sid: phone_number.sid,
    type: req.body.type,
    number: req.body.number.phoneNumber,
    locality: req.body.number.locality,
    region: req.body.number.region
  }).save(null, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/team/numbers'
  ])

  await activity(req, {
    story: 'provisioned {object}',
    object: number
  })

  res.status(200).respond(number, NumberSerializer)

}

export default createRoute
