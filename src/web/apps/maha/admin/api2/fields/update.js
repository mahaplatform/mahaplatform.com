import socket from '../../../../../core/services/routes/emitter'
import FieldSerializer from '../../../serializers/field_serializer'
import Field from '../../../models/field'
import _ from 'lodash'

const update = async (req, res) => {

  const field = await Field.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!field) return res.status(404).respond({
    code: 404,
    message: 'Unable to find field'
  })

  const allowed = _.pick(req.body, ['label','name','instructions','type','config'])

  const data = _.omitBy(allowed, _.isNil)

  await field.save(data, {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, {
    channel: `/admin/${req.params.parent_type}/${req.params.parent_id}/fields`
  })

  res.status(200).respond(field, (field) => {
    return FieldSerializer(req, req.trx, field)
  })

}

export default update
