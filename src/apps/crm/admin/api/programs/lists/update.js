import { activity } from '@core/services/routes/activities'
import { audit } from '@core/services/routes/audit'
import ListSerializer from '@apps/crm/serializers/list_serializer'
import socket from '@core/services/routes/emitter'
import { checkProgramAccess } from '@apps/crm/services/programs'
import List from '@apps/crm/models/list'

const updateRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage','edit']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const list = await List.query(qb => {
    qb.where('program_id', req.params.program_id)
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  await list.save({
    title: req.body.title
  }, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'updated',
    auditable: list
  })

  await activity(req, {
    story: 'updated {object}',
    object: list
  })

  await socket.refresh(req, [
    `/admin/crm/programs/${list.get('program_id')}`
  ])

  await res.status(200).respond(list, ListSerializer)

}

export default updateRoute
