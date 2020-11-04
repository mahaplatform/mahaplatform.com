import WorkflowRecordingSerializer from '../../../../automation/serializers/workflow_recording_serializer'
import WorkflowRecording from '../../../../automation/models/workflow_recording'

const recordingsRoute = async (req, res) => {

  const voice_campaigns = await WorkflowRecording.filterFetch({
    scope: (qb) => {
      qb.innerJoin('crm_workflow_actions','crm_workflow_actions.id','crm_workflow_recordings.action_id')
      qb.innerJoin('crm_workflow_steps','crm_workflow_steps.id','crm_workflow_actions.step_id')
      qb.innerJoin('crm_workflow_enrollments','crm_workflow_enrollments.id','crm_workflow_actions.enrollment_id')
      qb.where('crm_workflow_recordings.team_id', req.team.get('id'))
      qb.where('crm_workflow_enrollments.voice_campaign_id', req.params.campaign_id)
      qb.where('crm_workflow_steps.action', 'record')
    },
    filter: {
      params: req.query.$filter,
      allowed: []
    },
    sort: {
      params: req.query.sort,
      defaults:  '-created_at',
      allowed: ['id','title','program','status','created_at']
    },
    page: req.query.$page,
    withRelated: ['asset','action.enrollment.contact.photo'],
    transacting: req.trx
  })

  res.status(200).respond(voice_campaigns, WorkflowRecordingSerializer)

}

export default recordingsRoute
