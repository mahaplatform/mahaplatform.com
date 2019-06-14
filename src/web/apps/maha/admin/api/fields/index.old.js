import FieldSerializer from '../../../serializers/field_serializer'
import generateCode from '../../../../../core/utils/generate_code'
import { Resources } from '../../../../../core/backframe'
import Field from '../../../models/field'
import reorder from './reorder'

const defaultParams = async (req, trx, options) => {

  const delta = await Field.query(qb => {
    defaultQuery(req, trx, qb, options)
  }).count('*', {
    transacting: trx
  })

  return {
    parent_type: req.params.parent_type,
    parent_id: req.params.parent_id,
    code: generateCode(),
    delta: delta,
    config: {},
    is_mutable: true
  }

}

const defaultQuery = (req, trx, qb, options) => {
  qb.where('maha_fields.parent_type', req.params.parent_type)
  qb.where('maha_fields.parent_id', req.params.parent_id)
}

const refresh = {
  create: (req, trx, result, options) => [
    `/admin/${req.params.parent_type}/${req.params.parent_id}/fields`
  ],
  update: (req, trx, result, options) => [
    `/admin/${req.params.parent_type}/${req.params.parent_id}/fields`
  ],
  destroy: (req, trx, result, options) => [
    `/admin/${req.params.parent_type}/${req.params.parent_id}/fields`
  ]
}

const afterDestroy = async (req, trx, result, options) => {
  const fields = await options.knex('maha_fields').where({
    parent_type: req.params.parent_type,
    parent_id: req.params.parent_id
  }).orderBy('delta', 'asc').transacting(trx)
  await Promise.mapSeries(fields, async (field, delta) => {
    await options.knex('maha_fields').where({
      id: field.id
    }).update({ delta }).transacting(trx)
  })
}

const fieldSerializer = new Resources({
  allowedParams: ['label','name','instructions','type','config'],
  afterProcessor: {
    destroy: afterDestroy
  },
  collectionActions: [
    reorder
  ],
  defaultParams,
  defaultQuery,
  defaultSort: 'delta',
  model: Field,
  path: '/:parent_type/:parent_id/fields',
  refresh,
  serializer: FieldSerializer
})

export default fieldSerializer
