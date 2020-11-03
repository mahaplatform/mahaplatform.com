import { createWorkflow } from '../../../../../automation/services/workflows'
import { activity } from '../../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../../core/services/routes/params'
import ListSerializer from '../../../../serializers/list_serializer'
import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import { checkProgramAccess } from '../../../../services/programs'
import List from '../../../../models/list'

const createRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage','edit']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const list = await List.forge({
    team_id: req.team.get('id'),
    program_id: req.params.program_id,
    ...whitelist(req.body, ['title','type','criteria'])
  }).save(null, {
    transacting: req.trx
  })

  if(req.body.subscribe_workflow) {
    await createWorkflow(req, {
      list,
      title: 'Subscribe Workflow',
      action: 'add',
      program_id: req.params.program_id
    })
  }

  if(req.body.unsubscribe_workflow) {
    await createWorkflow(req, {
      list,
      title: 'Unsubscribe Workflow',
      action: 'remove',
      program_id: req.params.program_id
    })
  }

  await audit(req, {
    story: 'created',
    auditable: list
  })

  await activity(req, {
    story: 'created {object}',
    object: list
  })

  await socket.refresh(req, [
    `/admin/crm/programs/${req.params.program_id}`
  ])

  res.status(200).respond(list, ListSerializer)

}

export default createRoute
