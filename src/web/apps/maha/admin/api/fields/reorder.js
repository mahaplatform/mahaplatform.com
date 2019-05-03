import { Route } from '../../../../../core/backframe'

const processor = async (req, trx, options) => {

  const fields = await options.knex('maha_fields').where({
    parent_type: req.params.parent_type,
    parent_id: req.params.parent_id
  }).transacting(trx)

  await Promise.map(fields, async (field) => {

    const from = parseInt(req.body.from)

    const to = parseInt(req.body.to)

    if(from < to && field.delta > from && field.delta <= to) {

      await options.knex('maha_fields').where({
        id: field.id
      }).update({
        delta: field.delta - 1
      }).transacting(trx)

    } else if(from > to && field.delta < from && field.delta >= to) {

      await options.knex('maha_fields').where({
        id: field.id
      }).update({
        delta: field.delta + 1
      }).transacting(trx)

    } else if(field.delta === from) {

      await options.knex('maha_fields').where({
        id: field.id
      }).update({
        delta: to
      }).transacting(trx)

    }

  })

  return true

}

const refresh = (req, trx, result, options) => [
  `/admin/${req.params.parent_type}/${req.params.parent_id}/fields`
]

const createRoute = new Route({
  method: 'patch',
  path: '/reorder',
  processor,
  refresh
})

export default createRoute
