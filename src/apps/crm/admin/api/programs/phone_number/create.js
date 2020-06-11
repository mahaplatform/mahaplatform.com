import PhoneNumberSerializer from '../../../../../team/serializers/phone_number_serializer'
import { activity } from '../../../../../../core/services/routes/activities'
import generateCode from '../../../../../../core/utils/generate_code'
import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import { checkProgramAccess } from '../../../../services/programs'
import PhoneNumber from '../../../../../maha/models/phone_number'
import VoiceCampaign from '../../../../models/voice_campaign'
import twilio from '../../../../../../core/services/twilio'
import Program from '../../../../models/program'

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
    friendly_name: `${req.team.get('subdomain')} - ${program.get('title')} voice/sms`,
    smsMethod: 'POST',
    smsUrl: `${process.env.TWIML_HOST}/sms`,
    voiceMethod: 'POST',
    voiceUrl: `${process.env.TWIML_HOST}/voice`,
    voiceReceiveMode: req.body.type,
    statusMethod: 'POST',
    statusCallback: `${process.env.TWIML_HOST}/voice/status`
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

  await program.save({
    phone_number_id: phone_number.get('id')
  }, {
    transacting: req.trx,
    patch: true
  })

  const voice_code = await generateCode(req, {
    table: 'crm_voice_campaigns'
  })

  const voice_campaign = await VoiceCampaign.forge({
    team_id: req.team.get('id'),
    code: voice_code,
    status: 'active',
    program_id: program.get('id'),
    phone_number_id: phone_number.get('id'),
    title: 'Phone System',
    direction: 'inbound',
    purpose: 'transactional'
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: voice_campaign
  })

  await socket.refresh(req, [
    '/admin/team/phone_numbers',
    '/admin/crm/programs',
    `/admin/crm/programs/${program.id}`,
    '/admin/crm/campaigns/voice/inbound'
  ])

  await activity(req, {
    story: 'provisioned {object}',
    object: phone_number
  })

  res.status(200).respond(phone_number, PhoneNumberSerializer)

}

export default createRoute
