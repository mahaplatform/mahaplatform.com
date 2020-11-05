import { activity } from '@core/services/routes/activities'
import socket from '@core/services/routes/emitter'
import { deleteWorkflow } from '../../../services/workflows'
import Workflow from '../../../models/workflow'

const destroyRoute = async (req, res) => {

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

  await deleteWorkflow(req, {
    workflow
  })

  await activity(req, {
    story: 'deleted {object}',
    object: workflow
  })

  await socket.refresh(req, [
    '/admin/automation/workflows',
    `/admin/automation/workflows/${workflow.id}`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
