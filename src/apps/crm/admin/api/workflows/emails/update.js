import WorkflowEmailSerializer from '../../../../serializers/workflow_email_serializer'
import WorkflowEmail from '../../../../models/workflow_email'
import Workflow from '../../../../models/workflow'

const updateRoute = async (req, res) => {

  const workflow = await Workflow.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.workflow_id)
  }).fetch({
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  const email = await WorkflowEmail.scope(qb => {
  }).query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('workflow_id', workflow.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!email) return res.status(404).respond({
    code: 404,
    message: 'Unable to load email'
  })

  await email.save({
    config: req.body.config
  }, {
    transacting: req.trx
  })

  res.status(200).respond(email, WorkflowEmailSerializer)

}

export default updateRoute
