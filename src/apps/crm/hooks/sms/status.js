import WorkflowEnrollment from '../../models/workflow_enrollment'
import socket from '../../../../core/services/routes/emitter'
import { executeWorkflow } from '../../services/workflows'
import PhoneNumber from '../../models/phone_number'

const status = async (req, { sms, status }) => {

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('number', sms.related('to').get('number'))
  }).fetch({
    transacting: req.trx
  })

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.where('contact_id', phone_number.get('contact_id'))
  }).fetch({
    transacting: req.trx
  })

  if(!enrollment) return

  await executeWorkflow(req, {
    enrollment_id: enrollment.get('id'),
    code: req.params.code
  }) || {}

  await socket.refresh(req, [
    `/admin/crm/campaigns/voice/${enrollment.get('voice_campaign_id')}`,
    `/admin/crm/campaigns/voice/${enrollment.get('voice_campaign_id')}/calls`,
    `/admin/crm/campaigns/voice/${enrollment.get('voice_campaign_id')}/calls/${enrollment.get('id')}`
  ])

}

export default status
