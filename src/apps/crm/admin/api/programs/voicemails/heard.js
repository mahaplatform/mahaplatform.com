import WorkflowRecording from '@apps/automation/models/recording'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import { checkProgramAccess } from '@apps/crm/services/programs'

const heardRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage','edit','view']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const recording = await WorkflowRecording.query(qb => {
    qb.innerJoin('automation_actions','automation_actions.id','automation_recordings.action_id')
    qb.innerJoin('automation_enrollments','automation_enrollments.id','automation_actions.enrollment_id')
    qb.innerJoin('campaigns_voice_campaigns','campaigns_voice_campaigns.id','automation_enrollments.voice_campaign_id')
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=campaigns_voice_campaigns.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('automation_recordings.team_id', req.team.get('id'))
    qb.where('automation_recordings.id', req.params.id)
  }).fetch({
    withRelated: ['asset','action.enrollment.contact.photo'],
    transacting: req.trx
  })

  await recording.save({
    was_heard: true
  }, {
    transacting: req.trx,
    patch: true
  })

  await audit(req, {
    story: 'listened to',
    auditable: recording
  })

  await socket.refresh(req, [
    `/admin/crm/programs/${req.params.program_id}/receipts`,
    `/admin/crm/programs/${req.params.program_id}/voicemails`,
    `/admin/crm/programs/${req.params.program_id}/voicemails/${req.params.id}`
  ])

  res.status(200).respond(true)

}
export default heardRoute
