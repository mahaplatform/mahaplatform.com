import WorkflowRecordingSerializer from '../../../../serializers/workflow_recording_serializer'
import WorkflowRecording from '../../../../models/workflow_recording'
import { checkProgramAccess } from '../../../../services/programs'

const showRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage','edit','view']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const recording = await WorkflowRecording.query(qb => {
    qb.innerJoin('crm_workflow_actions','crm_workflow_actions.id','crm_workflow_recordings.action_id')
    qb.innerJoin('crm_workflow_enrollments','crm_workflow_enrollments.id','crm_workflow_actions.enrollment_id')
    qb.innerJoin('crm_voice_campaigns','crm_voice_campaigns.id','crm_workflow_enrollments.voice_campaign_id')
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_voice_campaigns.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('crm_workflow_recordings.team_id', req.team.get('id'))
    qb.where('crm_workflow_recordings.id', req.params.id)
  }).fetch({
    withRelated: ['asset','action.enrollment.contact.photo'],
    transacting: req.trx
  })

  res.status(200).respond(recording, WorkflowRecordingSerializer)

}

export default showRoute
