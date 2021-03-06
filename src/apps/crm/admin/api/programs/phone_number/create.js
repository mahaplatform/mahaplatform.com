import { createDefaultInboundCampaign } from '@apps/campaigns/services/voice_campaigns'
import PhoneNumberSerializer from '@apps/team/serializers/phone_number_serializer'
import { activity } from '@core/services/routes/activities'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import { checkProgramAccess } from '@apps/crm/services/programs'
import PhoneNumber from '@apps/maha/models/phone_number'
import twilio from '@core/vendor/twilio'
import Program from '@apps/crm/models/program'

const createRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const program = await Program.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.program_id)
  }).fetch({
    withRelated: ['phone_number'],
    transacting: req.trx
  })

  if(!program) return res.status(404).respond({
    code: 404,
    message: 'Unable to load program'
  })

  if(program.get('phone_number_id')) return res.status(404).respond({
    code: 422,
    message: 'This program already has a phone number'
  })

  const number = await twilio.incomingPhoneNumbers.create({
    phoneNumber: req.body.number.phoneNumber,
    friendlyName: `${req.team.get('subdomain')} - ${program.get('title')} voice/sms`,
    smsMethod: 'POST',
    smsUrl: `${process.env.TWILIO_HOST_TWIML}/sms`,
    voiceMethod: 'POST',
    voiceUrl: `${process.env.TWILIO_HOST_TWIML}/voice`,
    voiceReceiveMode: req.body.type,
    statusMethod: 'POST',
    statusCallback: `${process.env.TWILIO_HOST_STATUS}/voice/status`
  })

  const phone_number = await PhoneNumber.forge({
    team_id: req.team.get('id'),
    sid: number.sid,
    type: 'voice',
    number: req.body.number.phoneNumber,
    locality: req.body.number.locality,
    region: req.body.number.region
  }).save(null, {
    transacting: req.trx
  })

  await program.save({
    phone_number_id: phone_number.get('id')
  }, {
    transacting: req.trx,
    patch: true
  })

  await createDefaultInboundCampaign(req, {
    phone_number,
    program
  })

  await socket.refresh(req, [
    '/admin/team/phone_numbers',
    '/admin/crm/programs',
    `/admin/crm/programs/${program.id}`
  ])

  await audit(req, {
    story: 'provisioned phone number',
    auditable: phone_number
  })

  await activity(req, {
    story: 'provisioned {object}',
    object: phone_number
  })

  await res.status(200).respond(phone_number, PhoneNumberSerializer)

}

export default createRoute
