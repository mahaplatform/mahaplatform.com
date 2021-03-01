import { whitelist } from '@core/services/routes/params'
import FieldSerializer from '@apps/maha/serializers/field_serializer'
import { createField } from '@apps/maha/services/fields'
import socket from '@core/services/routes/emitter'

const createRoute = async (req, res) => {

  const field = await createField(req, {
    parent_type: req.params.parent_type,
    parent_id: req.params.parent_id,
    is_mutable: true,
    ...whitelist(req.body, ['name','type','config'])
  })

  await socket.refresh(req, {
    channel: req.params.parent_id ? `/admin/${req.params.parent_type}/${req.params.parent_id}/fields` : `/admin/${req.params.parent_type}/fields`
  })

  res.status(200).respond(field, FieldSerializer)

}

export default createRoute
