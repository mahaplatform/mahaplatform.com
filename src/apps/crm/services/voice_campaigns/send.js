import ExecuteVoiceCampaignQueue from '../../queues/execute_voice_campaign_queue'
import WorkflowEnrollment from '../../models/workflow_enrollment'
import generateCode from '../../../../core/utils/generate_code'
import VoiceCampaign from '../../models/voice_campaign'
import { getRecipients } from '../recipients'
import moment from 'moment'

export const sendVoiceCampaign = async (req, { campaign_id }) => {

  const campaign = await VoiceCampaign.query(qb => {
    qb.where('id', campaign_id)
  }).fetch({
    transacting: req.trx
  })

  const contacts = await getRecipients(req, {
    type: 'voice',
    program_id: campaign.get('program_id'),
    purpose: campaign.get('purpose'),
    criteria: campaign.get('to').criteria
  }).then(result => result.toArray())

  await campaign.save({
    sent_at: moment(),
    // status: 'sent'
  }, {
    transacting: req.trx,
    patch: true
  })

  await Promise.map(contacts, async (contact) => {

    const code = await generateCode(req, {
      table: 'crm_workflow_enrollments'
    })

    const enrollment = await WorkflowEnrollment.forge({
      team_id: req.team.get('id'),
      voice_campaign_id: campaign.get('id'),
      phone_number_id: contact.related('phone_number').get('id'),
      contact_id: contact.get('id'),
      code,
      was_completed: false,
      was_converted: false
    }).save(null, {
      transacting: req.trx
    })

    await ExecuteVoiceCampaignQueue.enqueue(req, {
      enrollment_id: enrollment.get('id')
    })

  })

}
