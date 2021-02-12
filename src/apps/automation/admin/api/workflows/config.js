import { updateVersion } from '@apps/maha/services/versions'
import Workflow from '@apps/automation/models/workflow'

const configRoute = async (req, res) => {

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

  await updateVersion(req, {
    versionable_type: 'crm_workflows',
    versionable_id: workflow.get('id'),
    key: 'config',
    value: req.body
  })

  res.status(200).respond(true)

}

export default configRoute
