import WorkflowEnrollment from '../../models/workflow_enrollment'
import generateCode from '../../../../core/utils/generate_code'
import { contactActivity } from '../../services/activities'
import { createCall } from '../../../maha/services/calls'
import VoiceCampaign from '../../models/voice_campaign'
import PhoneNumber from '../../models/phone_number'

const makeCall = async (req, params) => {

  const { voice_campaign_id, phone_number_id, contact_id } = params

  const campaign = await VoiceCampaign.query(qb => {
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

  const code = await generateCode(req, {
    table: 'crm_workflow_enrollments'
  })

  const enrollment = await WorkflowEnrollment.forge({
    team_id: req.team.get('id'),
    voice_campaign_id,
    phone_number_id,
    contact_id,
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
    story: 'received an outbound voice campaign',
    program_id: enrollment.related('voice_campaign').get('program_id'),
    data: {
      enrollment_id: enrollment.get('id'),
      voice_campaign_id: enrollment.related('voice_campaign').get('id')
    }
  })

  const call = await createCall(req, {
    method: 'POST',
    url: `${process.env.TWIML_HOST}/voice/crm/enrollments/${enrollment.get('code')}`,
    from: campaign.related('program').related('phone_number').get('number'),
    to: phone_number.get('number')
  })

  await enrollment.save({
    call_id: call.get('id')
  }, {
    transacting: req.trx
  })

}

export default makeCall
