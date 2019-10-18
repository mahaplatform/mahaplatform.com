import VoiceCampaignSerializer from '../../../../serializers/voice_campaign_serializer'
import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import generateCode from '../../../../../../core/utils/generate_code'
import socket from '../../../../../../core/services/routes/emitter'
import VoiceCampaign from '../../../../models/voice_campaign'
import Workflow from '../../../../models/workflow'

const createRoute = async (req, res) => {

  const workflowcode = await generateCode(req, {
    table: 'crm_workflows'
  })

  const workflow = await Workflow.forge({
    team_id: req.team.get('id'),
    code: workflowcode,
    type: 'voice',
    status: 'draft',
    title: 'Inbound Voice Campaign',
    steps: []
  }).save(null, {
    transacting: req.trx
  })

  const code = await generateCode(req, {
    table: 'crm_voice_campaigns'
  })

  const campaign = await VoiceCampaign.forge({
    team_id: req.team.get('id'),
    code,
    status: 'draft',
    workflow_id: workflow.get('id'),
    ...whitelist(req.body, ['title','direction','program_id','phone_number_id'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: campaign
  })

  await socket.refresh(req, [
    '/admin/crm/campaigns'
  ])

  res.status(200).respond(campaign, VoiceCampaignSerializer)

}

export default createRoute
