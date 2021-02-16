import { createVersion } from '@apps/maha/services/versions'
import Workflow from '@apps/automation/models/workflow'
import generateCode from '@core/utils/generate_code'
import { audit } from '@core/services/routes/audit'

const getTriggerType = ({ list, topic, email_campaign }) => {
  if(list) return 'list'
  if(topic) return 'topic'
  if(email_campaign) return 'delivery'
}

const createWorkflow = async(req, params) => {

  const { list, topic, email_campaign, title, action, program_id } = params

  const workflowCode = await generateCode(req, {
    table: 'crm_workflows'
  })

  const workflow = await Workflow.forge({
    team_id: req.team.get('id'),
    list_id: list ? list.get('id') : null,
    topic_id: topic ? topic.get('id') : null,
    email_campaign_id: email_campaign ? email_campaign.get('id') : null,
    action,
    program_id,
    code: workflowCode,
    status: 'active',
    title,
    trigger_type: getTriggerType({ list, topic, email_campaign }),
    is_unique: false
  }).save(null, {
    transacting: req.trx
  })

  await createVersion(req, {
    versionable_type: 'crm_workflows',
    versionable_id: workflow.get('id'),
    key: 'config',
    value: {
      steps: []
    }
  })

  await audit(req, {
    story: 'created',
    auditable: workflow
  })

}

export default createWorkflow
