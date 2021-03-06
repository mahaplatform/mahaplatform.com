import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import TypeSerializer from '@apps/sites/serializers/type_serializer'
import socket from '@core/services/routes/emitter'
import Type from '@apps/sites/models/type'

const updateRoute = async (req, res) => {

  const type = await Type.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!type) return res.status(404).respond({
    code: 404,
    message: 'Unable to load type'
  })

  await type.save(whitelist(req.body, ['title','description','requires_approval','has_public_submission']), {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: type
  })

  await socket.message(req, {
    channel: 'user',
    action: 'session'
  })

  await socket.refresh(req, [
    `/admin/sites/sites/${req.params.site_id}`,
    `/admin/sites/sites/${req.params.site_id}/types/${type.get('id')}`
  ])

  await res.status(200).respond(type, TypeSerializer)

}

export default updateRoute
