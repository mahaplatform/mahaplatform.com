import WorkflowActionSerializer from '@apps/automation/serializers/workflow_action_serializer'
import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import WorkflowAction from '@apps/automation/models/workflow_action'
import Workflow from '@apps/automation/models/workflow'

const listRoute = async (req, res) => {

  const workflow = await Workflow.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.workflow_id)
  }).fetch({
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('workflow_id', workflow.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['contact.photo'],
    transacting: req.trx
  })

  if(!enrollment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load enrollment'
  })

  const actions = await WorkflowAction.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('enrollment_id', req.params.id)
    qb.orderBy('created_at', 'asc')
  }).fetchAll({
    withRelated: ['asset','email','field','list','program','recording','topic','user','workflow','sms','voicemail'],
    transacting: req.trx
  })

  await res.status(200).respond(actions, WorkflowActionSerializer)

}

export default listRoute
