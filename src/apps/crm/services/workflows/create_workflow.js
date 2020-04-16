import generateCode from '../../../../core/utils/generate_code'
import { audit } from '../../../../core/services/routes/audit'
import Workflow from '../../models/workflow'

const getTriggerType = ({ list, topic }) => {
  if(list) return 'list'
  if(topic) return 'topic'
}

const createWorkflow = async(req, params) => {

  const { list, topic, title, action, program_id } = params

  const workflowCode = await generateCode(req, {
    table: 'crm_workflows'
  })

  const workflow = await Workflow.forge({
    team_id: req.team.get('id'),
    list_id: list ? list.get('id') : null,
    topic_id: topic ? topic.get('id') : null,
    action,
    program_id,
    code: workflowCode,
    status: 'active',
    title,
    trigger_type: getTriggerType({ list, topic })
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: workflow
  })

}

export default createWorkflow
