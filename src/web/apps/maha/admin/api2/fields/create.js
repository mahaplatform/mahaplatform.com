import socket from '../../../../../core/services/routes/emitter'
import FieldSerializer from '../../../serializers/field_serializer'
import generateCode from '../../../../../core/utils/generate_code'
import Field from '../../../models/field'
import _ from 'lodash'

const createRoute = async (req, res) => {

  const delta = await Field.query(qb => {
    qb.where('maha_fields.parent_type', req.params.parent_type)
    qb.where('maha_fields.parent_id', req.params.parent_id)
  }).count('*', {
    transacting: req.trx
  })

  const allowed = _.pick(req.body, ['label','name','instructions','type','config'])

  const data = _.omitBy(allowed, _.isNil)

  const field = await Field.forge({
    team_id: req.team.get('id'),
    parent_type: req.params.parent_type,
    parent_id: req.params.parent_id,
    code: generateCode(),
    delta: delta,
    config: {},
    is_mutable: true,
    ...data
  }).save(null, {
    transacting: req.trx
  })

  await socket.refresh(req, {
    channel: `/admin/${req.params.parent_type}/${req.params.parent_id}/fields`
  })

  res.status(200).respond(field, (field) => {
    return FieldSerializer(req, req.trx, field)
  })

}

export default createRoute
