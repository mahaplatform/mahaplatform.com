import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import WorkflowSerializer from '../../../serializers/workflow_serializer'
import generateCode from '../../../../../core/utils/generate_code'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Workflow from '../../../models/workflow'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'crm_workflows'
  })

  const workflow = await Workflow.forge({
    team_id: req.team.get('id'),
    code,
    status: 'draft',
    steps: [],
    ...whitelist(req.body, ['title','program_id'])
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: workflow
  })

  await activity(req, {
    story: 'created {object}',
    object: workflow
  })

  await socket.refresh(req, [
    '/admin/crm/workflows'
  ])

  res.status(200).respond(workflow, WorkflowSerializer)

}

export default createRoute
