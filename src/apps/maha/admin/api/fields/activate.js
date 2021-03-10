import FieldSerializer from '@apps/maha/serializers/field_serializer'
import socket from '@core/services/routes/emitter'
import Field from '@apps/maha/models/field'

const activateRoute = async (req, res) => {

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

  const actives = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('parent_type', field.get('parent_type'))
    qb.where('parent_id', field.get('parent_id'))
    qb.whereNot('id', field.get('parent_id'))
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  })

  await field.save({
    is_active: req.body.is_active,
    delta: actives.length + 1
  }, {
    patch: true,
    transacting: req.trx
  })

  await Promise.mapSeries(actives, async (active, delta) => {
    await active.save({
      delta
    }, {
      transacting: req.trx,
      patch: true
    })
  })

  await socket.refresh(req, {
    channel: req.params.parent_id ? `/admin/${req.params.parent_type}/${req.params.parent_id}/fields` : `/admin/${req.params.parent_type}/fields`
  })

  await res.status(200).respond(field, FieldSerializer)

}

export default activateRoute
