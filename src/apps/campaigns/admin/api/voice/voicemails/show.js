import WorkflowRecordingSerializer from '@apps/automation/serializers/recording_serializer'
import WorkflowRecording from '@apps/automation/models/recording'

const showRoute = async (req, res) => {

  const voice_campaigns = await WorkflowRecording.query(qb => {
    qb.innerJoin('automation_actions','automation_actions.id','automation_recordings.action_id')
    qb.innerJoin('automation_steps','automation_steps.id','automation_actions.step_id')
    qb.innerJoin('automation_enrollments','automation_enrollments.id','automation_actions.enrollment_id')
    qb.where('automation_recordings.team_id', req.team.get('id'))
    qb.where('automation_enrollments.voice_campaign_id', req.params.campaign_id)
    qb.where('automation_steps.action', 'voicemail')
    qb.where('automation_recordings.id',  req.params.id)
  }).fetch({
    withRelated: ['asset','action.enrollment.contact.photo'],
    transacting: req.trx
  })

  res.status(200).respond(voice_campaigns, WorkflowRecordingSerializer)

}

export default showRoute
