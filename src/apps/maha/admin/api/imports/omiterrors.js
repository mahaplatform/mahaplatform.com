import { Route, ImportSerializer } from '../../../server'
import ImportItem from '../../../models/import_item'

const processor = async (req, trx, options) => {

  const items = await ImportItem.where({
    import_id: req.params.id,
    is_valid: false
  }).fetchAll({
    transacting: trx
  })

  await Promise.mapSeries(items.toArray(), async (item) => {

    await item.save({
      is_omitted: true
    }, {
      patch: true,
      transacting: trx
    })

  })

  await req.resource.save({
    error_count: 0,
    omit_count: (req.resource.get('error_count') + req.resource.get('omit_count'))
  }, { patch: true, transacting: trx })

  return req.resource

}

const omitErrorsRoute = new Route({
  method: 'post',
  path: '/omiterrors',
  processor,
  serializer: ImportSerializer
})

export default omitErrorsRoute
