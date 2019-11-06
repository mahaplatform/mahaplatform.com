import WorkflowSerializer from '../../../serializers/workflow_serializer'
import Workflow from '../../../models/workflow'
import Form from '../../../models/form'

const workflowsRoute = async (req, res) => {

  const form = await Form.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.form_id)
  }).fetch({
    transacting: req.trx
  })

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  const workflows = await Workflow.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('form_id', form.get('id'))
  }).fetchAll({
    transacting: req.trx
  })

  res.status(200).respond(workflows, WorkflowSerializer)

}

export default workflowsRoute
