import { activity } from '@core/services/routes/activities'
import socket from '@core/services/routes/emitter'
import { deleteWorkflow } from '@apps/automation/services/workflows'
import Workflow from '@apps/automation/models/workflow'

const destroyRoute = async (req, res) => {

  const workflow = await Workflow.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  await deleteWorkflow(req, {
    workflow
  })

  await activity(req, {
    story: 'deleted {object}',
    object: workflow
  })

  await socket.refresh(req, [
    '/admin/automation/workflows',
    `/admin/automation/workflows/${workflow.get('id')}`,
    ...workflow.get('list_id') ? [`/admin/crm/programs/${workflow.get('program_id')}/lists/${workflow.get('list_id')}`] : [],
    ...workflow.get('topic_id') ? [`/admin/crm/programs/${workflow.get('program_id')}/topics/${workflow.get('topic_id')}`] : [],
    ...workflow.get('email_campaign_id') ? [`/admin/campaigns/email/${workflow.get('email_campaign_id')}`] : [],
    ...workflow.get('event_id') ? [`/admin/events/events/${workflow.get('event_id')}`] : [],
    ...workflow.get('form_id') ? [`/admin/forms/forms/${workflow.get('form_id')}`] : [],
    ...workflow.get('store_id') ? [`/admin/stores/stores/${workflow.get('store_id')}`] : []
  ])

  await res.status(200).respond(true)

}

export default destroyRoute
