import { Route, ImportSerializer } from '../../../server'
import Import from '../../../models/import'
import flat from 'flat'

const processor = async (req, trx, options) => {

  await req.resource.save({
    is_valid: true
  }, { patch: true, transacting: trx })

  const imp = await Import.where({
    id: req.params.import_id
  }).fetch({
    transacting: trx
  })

  await imp.save({
    valid_count: (imp.get('valid_count') + 1),
    error_count: (imp.get('error_count') - 1)
  }, {
    patch: true,
    transacting: trx
  })

  return imp

}

const refresh = (req, trx, result, options) => `/admin/imports/${result.id}`

const rules = (req,trx,options) => flat(req.body.rules, { maxDepth: 2 })

const fixRoute = new Route({
  method: 'patch',
  path: '/fix',
  processor,
  refresh,
  rules,
  serializer: ImportSerializer
})

export default fixRoute
