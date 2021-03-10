import { activity } from '@core/services/routes/activities'
import socket from '@core/services/routes/emitter'
import { checkProgramAccess } from '@apps/crm/services/programs'
import { deleteList } from '@apps/crm/services/lists'
import List from '@apps/crm/models/list'

const destroyRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const list = await List.query(qb => {
    qb.where('crm_lists.program_id', req.params.program_id)
    qb.where('crm_lists.team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!list) return res.status(404).respond({
    code: 404,
    message: 'Unable to load list'
  })

  await deleteList(req, {
    list
  })

  await activity(req, {
    story: 'deleted {object}',
    object: list
  })

  await socket.refresh(req, [
    `/admin/crm/programs/${req.params.program_id}`,
    `/admin/crm/programs/${req.params.program_id}/lists/${req.params.id}`
  ])

  await res.status(200).respond(true)

}

export default destroyRoute
