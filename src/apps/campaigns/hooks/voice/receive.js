import { getEnrollmentTokens } from '@apps/automation/services/enrollments'
import { enrollInCampaign } from '@apps/campaigns/services/voice_campaigns'
import executeStep from '@apps/automation/services/workflows/execute_step'
import { getPhoneNumber } from '@apps/crm/services/phone_numbers'
import VoiceCampaign from '@apps/campaigns/models/voice_campaign'
import socket from '@core/services/routes/emitter'
import Twilio from 'twilio'

const receiveHook = async (req, { call, phone_number }) => {

  const twiml = new Twilio.twiml.VoiceResponse()

  const from = await getPhoneNumber(req, {
    number: call.related('from_number').get('number')
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
    twiml.say(`You have reached ${phone_number.related('program').get('title')}. I'm sorry, no one is able to take your call`)
    return twiml.toString()
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

  const tokens = await getEnrollmentTokens(req, {
    contact: from.related('contact'),
    enrollment,
    program: phone_number.related('program')
  })

  const result = await executeStep(req, {
    config: voice_campaign.get('config'),
    contact: from.related('contact'),
    program: phone_number.related('program'),
    tokens,
    twiml
  })

  if(result.next) {
    result.twiml.redirect(`${process.env.TWILIO_HOST_TWIML}/voice?state=${result.next}`)
  } else {
    result.twiml.hangup()
  }

  return twiml.toString()

}

export default receiveHook
