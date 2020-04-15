import socket from '../../../../../../../core/services/routes/emitter'
import { checkProgramAccess } from '../../../../../services/programs'
import List from '../../../../../models/list'

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
    qb.where('program_id', req.params.program_id)
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.list_id)
  }).fetch({
    transacting: req.trx
  })

  await req.trx('crm_subscriptions').where({
    list_id: list.get('id'),
    contact_id: req.params.id
  }).delete()

  await socket.refresh(req, [
    `/admin/crm/programs/${req.params.program_id}/lists/${req.params.list_id}`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
