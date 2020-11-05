import { executeWorkflow } from '@apps/automation/services/workflows'
import { lookupNumber } from '@apps/maha/services/phone_numbers'
import { enrollInCampaign } from '../../services/voice_campaigns'
import generateCode from '@core/utils/generate_code'
import socket from '@core/services/routes/emitter'
import PhoneNumber from '@apps/crm/models/phone_number'
import VoiceCampaign from '../../models/voice_campaign'
import Contact from '@apps/crm/models/contact'
import { twiml } from 'twilio'

const getPhoneNumber = async (req, { number }) => {

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('number', number)
  }).fetch({
    withRelated: ['contact'],
    transacting: req.trx
  })

  if(phone_number) return phone_number

  const caller = await lookupNumber(req, {
    number
  })

  const code = await generateCode(req, {
    table: 'crm_contacts'
  })

  const contact = await Contact.forge({
    team_id: req.team.get('id'),
    code,
    first_name: caller.first_name,
    last_name: caller.last_name
  }).save(null, {
    transacting: req.trx
  })

  const new_phone_number = await PhoneNumber.forge({
    team_id: req.team.get('id'),
    contact_id: contact.get('id'),
    number,
    is_primary: true,
    undelivered_count: 0,
    can_text: true
  }).save(null, {
    transacting: req.trx
  })

  await new_phone_number.load(['contact'], {
    transacting: req.trx
  })

  return new_phone_number

}

const receive = async (req, { call, phone_number }) => {

  const from = await getPhoneNumber(req, {
    number: call.related('from').get('number')
  })

  await phone_number.load(['program'], {
    transacting: req.trx
  })

  await call.save({
    program_id: phone_number.related('program').get('id'),
    phone_number_id: from.get('id'),
    was_answered: false
  }, {
    transacting: req.trx,
    patch: true
  })

  await socket.refresh(req, [
    `/admin/crm/programs/${phone_number.related('program').get('id')}/channels/voice/calls`,
    `/admin/crm/programs/${phone_number.related('program').get('id')}/channels/voice/${from.get('id')}/calls`
  ])

  const voice_campaign = await VoiceCampaign.query(qb => {
    qb.where('phone_number_id', phone_number.get('id'))
    qb.where('direction', 'inbound')
    qb.where('status', 'active')
  }).fetch({
    transacting: req.trx
  })

  if(!voice_campaign) {
    const response = new twiml.VoiceResponse()
    response.say(`You have reached ${phone_number.related('program').get('title')}. I'm sorry, no one is able to take your call`)
    return response.toString()
  }

  const enrollment = await enrollInCampaign(req, {
    phone_number: from,
    voice_campaign,
    call,
    contact: from.related('contact')
  })

  await call.save({
    was_answered: true
  }, {
    transacting: req.trx,
    patch: true
  })

  const result = await executeWorkflow(req, {
    enrollment_id: enrollment.get('id'),
    call_status: 'in-progress',
    execute: true
  })

  return result.twiml

}

export default receive
