import { whitelist } from '@core/services/routes/params'
import FieldSerializer from '../../../serializers/field_serializer'
import generateCode from '@core/utils/generate_code'
import socket from '@core/services/routes/emitter'
import Field from '../../../models/field'

const createRoute = async (req, res) => {

  const delta = await Field.query(qb => {
    qb.where('maha_fields.parent_type', req.params.parent_type)
    if(req.params.parent_id) {
      qb.where('maha_fields.parent_id', req.params.parent_id)
    }
    qb.where('team_id', req.team.get('id'))
  }).count('*', {
    transacting: req.trx
  })

  const code = await generateCode(req, {
    table: 'maha_fields'
  })

  const field = await Field.forge({
    team_id: req.team.get('id'),
    parent_type: req.params.parent_type,
    parent_id: req.params.parent_id,
    code,
    delta: delta,
    config: {},
    is_mutable: true,
    ...whitelist(req.body, ['label','name','instructions','type','config'])
  }).save(null, {
    transacting: req.trx
  })

  await socket.refresh(req, {
    channel: req.params.parent_id ? `/admin/${req.params.parent_type}/${req.params.parent_id}/fields` : `/admin/${req.params.parent_type}/fields`
  })

  res.status(200).respond(field, FieldSerializer)

}

export default createRoute
