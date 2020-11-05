import WorkflowEnrollment from '../../../automation/models/workflow_enrollment'
import socket from '@core/services/routes/emitter'

const status = async (req, { call, status }) => {

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.where('call_id', call.get('id'))
  }).fetch({
    transacting: req.trx
  })

  if(!enrollment) return

  if(enrollment.get('status') !== 'completed') {
    await enrollment.save({
      was_hungup: true
    }, {
      transacting: req.trx
    })
  }

  await socket.refresh(req, [
    `/admin/campaigns/voice/${enrollment.get('voice_campaign_id')}`,
    `/admin/campaigns/voice/${enrollment.get('voice_campaign_id')}/calls`,
    `/admin/campaigns/voice/${enrollment.get('voice_campaign_id')}/calls/${enrollment.get('id')}`
  ])

}

export default status
