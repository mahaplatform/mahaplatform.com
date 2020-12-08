import WorkflowSerializer from '@apps/automation/serializers/workflow_serializer'
import { whitelist } from '@core/services/routes/params'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import { updateSteps } from '@apps/automation/services/workflows'
import Workflow from '@apps/automation/models/workflow'

const updateRoute = async (req, res) => {

  const workflow = await Workflow.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['email','form','list','program.phone_number','steps','topic'],
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  if(req.body.title) {
    await workflow.save({
      ...whitelist(req.body, ['title'])
    }, {
      patch: true,
      transacting: req.trx
    })
  }

  if(req.body.steps) {
    await updateSteps(req, {
      workflow,
      steps: req.body.steps
    })
  }

  await audit(req, {
    story: 'updated',
    auditable: workflow
  })

  await socket.refresh(req, [
    '/admin/automation/workflows',
    `/admin/automation/workflows/${workflow.get('id')}`,
    ...workflow.get('list_id') ? [`/admin/crm/programs/${workflow.get('program_id')}/lists/${workflow.get('list_id')}`] : [],
    ...workflow.get('topic_id') ? [`/admin/crm/programs/${workflow.get('program_id')}/topics/${workflow.get('topic_id')}`] : [],
    ...workflow.get('email_campaign_id') ? [`/admin/campaigns/email_campaign_id/email/${workflow.get('email_campaign_id')}`] : [],
    ...workflow.get('event_id') ? [`/admin/events/events/${workflow.get('event_id')}`] : [],
    ...workflow.get('form_id') ? [`/admin/forms/forms/${workflow.get('form_id')}`] : [],
    ...workflow.get('store_id') ? [`/admin/stores/stores/${workflow.get('store_id')}`] : []
  ])

  res.status(200).respond(workflow, WorkflowSerializer)

}

export default updateRoute
