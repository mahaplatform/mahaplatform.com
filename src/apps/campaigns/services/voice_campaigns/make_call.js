import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import VoiceCampaign from '@apps/campaigns/models/voice_campaign'
import { contactActivity } from '@apps/crm/services/activities'
import { getPublished } from '@apps/maha/services/versions'
import PhoneNumber from '@apps/crm/models/phone_number'
import { createCall } from '@apps/maha/services/calls'
import generateCode from '@core/utils/generate_code'

const makeCall = async (req, params) => {

  const { voice_campaign_id, phone_number_id, contact_id } = params

  const voice_campaign = await VoiceCampaign.query(qb => {
    qb.where('id', voice_campaign_id)
  }).fetch({
    withRelated: ['program.phone_number'],
    transacting: req.trx
  })

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('id', phone_number_id)
  }).fetch({
    transacting: req.trx
  })

  const version = await getPublished(req, {
    versionable_type: 'crm_voice_campaigns',
    versionable_id: voice_campaign.get('id'),
    key: 'config'
  })

  const code = await generateCode(req, {
    table: 'crm_workflow_enrollments'
  })

  const enrollment = await WorkflowEnrollment.forge({
    team_id: req.team.get('id'),
    voice_campaign_id,
    phone_number_id,
    contact_id,
    version_id: version.get('id'),
    code,
    data: {},
    was_answering_machine: false,
    was_hungup: false,
    status: 'active',
    was_converted: false
  }).save(null, {
    transacting: req.trx
  })

  await enrollment.load(['contact','voice_campaign'], {
    transacting: req.trx
  })

  await contactActivity(req, {
    contact: enrollment.related('contact'),
    type: 'voice_campaign',
    story: 'received a voice campaign',
    program_id: enrollment.related('voice_campaign').get('program_id'),
    data: {
      enrollment_id: enrollment.get('id'),
      voice_campaign_id: enrollment.related('voice_campaign').get('id')
    }
  })

  const call = await createCall(req, {
    method: 'POST',
    url: `${process.env.TWILIO_HOST_TWIML}/voice/campaigns/enrollments/${enrollment.get('code')}`,
    from: voice_campaign.related('program').related('phone_number').get('number'),
    to: phone_number.get('number')
  })

  await call.save({
    program_id: enrollment.related('voice_campaign').get('program_id'),
    phone_number_id: phone_number.get('id')
  }, {
    transacting: req.trx
  })

  await enrollment.save({
    call_id: call.get('id')
  }, {
    transacting: req.trx
  })
}

export default makeCall
