import socket from '../../../../../core/services/routes/emitter'
import Field from '../../../models/field'

const destroyRoute = async (req, res) => {

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

  await field.destroy({
    transacting: req.trx
  })

  const fields = await req.trx('maha_fields')
    .where('parent_type', req.params.parent_type)
    .where(qb => {
      if(req.params.parent_id) {
        qb.where('parent_id', req.params.parent_id)
      }
    })
    .orderBy('delta', 'asc')

  await Promise.mapSeries(fields, async (field, delta) => {
    await req.trx('maha_fields')
      .where('id', field.id)
      .update({ delta })
  })

  await socket.refresh(req, {
    channel: req.params.parent_id ?
      `/admin/${req.params.parent_type}/${req.params.parent_id}/fields` :
      `/admin/${req.params.parent_type}/fields`
  })

  res.status(200).respond(true)

}

export default destroyRoute
