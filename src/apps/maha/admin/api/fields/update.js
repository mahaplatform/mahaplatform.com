import { whitelist } from '@core/services/routes/params'
import FieldSerializer from '@apps/maha/serializers/field_serializer'
import socket from '@core/services/routes/emitter'
import Field from '@apps/maha/models/field'

const update = async (req, res) => {

  const field = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!field) return res.status(404).respond({
    code: 404,
    message: 'Unable to find field'
  })

  await field.save(whitelist(req.body, ['name','type','config']), {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, {
    channel: req.params.parent_id ? `/admin/${req.params.parent_type}/${req.params.parent_id}/fields` : `/admin/${req.params.parent_type}/fields`
  })

  await res.status(200).respond(field, FieldSerializer)

}

export default update
