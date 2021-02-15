import { renderWorkflow } from '@apps/automation/services/workflows'
import { publishVersion } from '@apps/maha/services/versions'
import Workflow from '@apps/automation/models/workflow'
import socket from '@core/services/routes/emitter'

const publishRoute = async (req, res) => {

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

  const version = await publishVersion(req, {
    versionable_type: 'crm_workflows',
    versionable_id: workflow.get('id'),
    key: 'config',
    publish_id: req.body.publish_id
  })

  await socket.refresh(req, [
    `/admin/crm_workflows/${workflow.get('id')}/config/versions`
  ])

  const config = await renderWorkflow(req, {
    code: workflow.get('code'),
    config: version.get('value')
  })

  await workflow.save({
    config
  },{
    transacting: req.trx,
    patch: true
  })

  res.status(200).respond(true)

}


export default publishRoute
