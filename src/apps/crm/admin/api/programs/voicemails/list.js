import WorkflowRecordingSerializer from '@apps/automation/serializers/recording_serializer'
import WorkflowRecording from '@apps/automation/models/recording'
import { checkProgramAccess } from '@apps/crm/services/programs'

const listRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage','edit','view']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const recordings = await WorkflowRecording.filterFetch({
    scope: (qb) => {
      qb.innerJoin('automation_actions','automation_actions.id','automation_recordings.action_id')
      qb.innerJoin('automation_steps','automation_steps.id','automation_actions.step_id')
      qb.innerJoin('automation_enrollments','automation_enrollments.id','automation_actions.enrollment_id')
      qb.innerJoin('crm_contacts','crm_contacts.id','automation_enrollments.contact_id')
      qb.innerJoin('campaigns_voice_campaigns','campaigns_voice_campaigns.id','automation_enrollments.voice_campaign_id')
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=campaigns_voice_campaigns.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('automation_recordings.team_id', req.team.get('id'))
      qb.where('campaigns_voice_campaigns.program_id', req.params.program_id)
      qb.where('automation_steps.action', 'voicemail')
    },
    aliases: {
      first_name: 'crm_contacts.first_name',
      last_name: 'crm_contacts.last_name'
    },
    filter: {
      params: req.query.$filter,
      search: ['first_name','last_name'],
      allowed: ['id']
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at'
    },
    page: req.query.$page,
    withRelated: ['asset','action.enrollment.contact.photo'],
    transacting: req.trx
  })

  res.status(200).respond(recordings, WorkflowRecordingSerializer)

}

export default listRoute
