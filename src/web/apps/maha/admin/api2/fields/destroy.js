import { refresh } from '../../../../../core/services/routes/emitter'
import knex from '../../../../../core/services/knex'
import Field from '../../../models/field'

const destroyRoute = async (req, res) => {

  const field = await Field.query(qb => {
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

  const fields = await knex('maha_fields').transacting(req.trx).where({
    parent_type: req.params.parent_type,
    parent_id: req.params.parent_id
  }).orderBy('delta', 'asc')

  await Promise.mapSeries(fields, async (field, delta) => {
    await knex('maha_fields').transacting(req.trx).where({
      id: field.id
    }).update({
      delta
    })
  })

  await refresh(req, {
    channel: `/admin/${req.params.parent_type}/${req.params.parent_id}/fields`
  })

  res.status(200).respond(true)

}

export default destroyRoute
