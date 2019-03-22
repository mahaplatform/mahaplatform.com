import { Route, ImportSerializer } from '../../../server'
import Import from '../../../models/import'

const processor = async (req, trx, options) => {

  await req.resource.save({
    is_omitted: true
  }, { patch: true, transacting: trx })

  const imp = await Import.where({
    id: req.params.import_id
  }).fetch({
    transacting: trx
  })

  await imp.save({
    omit_count: (imp.get('omit_count') + 1),
    error_count: (imp.get('error_count') - 1)
  }, {
    patch: true,
    transacting: trx
  })

  return imp

}

const refresh = (req, trx, result, options) => `/admin/imports/${result.id}`

const omitRoute = new Route({
  method: 'patch',
  path: '/omit',
  processor,
  refresh,
  serializer: ImportSerializer
})

export default omitRoute
