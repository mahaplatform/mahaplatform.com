import { whitelist } from '../../../../../web/core/services/routes/params'
import FieldSerializer from '../../../serializers/field_serializer'
import socket from '../../../../../web/core/services/routes/emitter'
import Field from '../../../models/field'

const update = async (req, res) => {

  const field = await Field.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!field) return res.status(404).respond({
    code: 404,
    message: 'Unable to find field'
  })

  await field.save(whitelist(req.body, ['label','name','instructions','type','config']), {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, {
    channel: req.params.parent_id ? `/admin/${req.params.parent_type}/${req.params.parent_id}/fields` : `/admin/${req.params.parent_type}/fields`
  })

  res.status(200).respond(field, FieldSerializer)

}

export default update
