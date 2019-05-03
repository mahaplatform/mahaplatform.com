import generateCode from '../../../../../core/utils/generate_code'
import TypeSerializer from '../../../serializers/type_serializer'
import { Resources } from '../../../../../core/backframe'
import Field from '../../../../maha/models/field'
import Type from '../../../models/type'

const afterCreate = async (req, trx, result, options) => {

  await Field.forge({
    team_id: req.team.get('id'),
    parent_type: 'sites_types',
    parent_id: result.get('id'),
    code: generateCode(),
    delta: 0,
    label: 'Title',
    name: 'title',
    type: 'textfield',
    config: {
      required: true
    }
  }).save(null, { transacting: trx })

}

const defaultParams = (req, trx, options) => ({
  site_id: req.params.site_id
})

const defaultQuery = (req, trx, qb, options) => {

  qb.where('sites_types.site_id', req.params.site_id)

}

const message = (req, trx, result, options) => ({
  channel: 'user',
  action: 'session'
})

const messages = {
  create: message,
  update: message
}

const targets = (req, trx, result, options) => [
  `/admin/sites/sites/${req.params.site_id}`
]

const refresh = {
  create: targets,
  update: targets
}

const typesResources = new Resources({
  afterProcessor: {
    create: afterCreate
  },
  allowedParams: ['title','description'],
  defaultParams,
  defaultQuery,
  defaultSort: 'title',
  messages,
  model: Type,
  path: '/sites/:site_id/types',
  refresh,
  serializer: TypeSerializer
})

export default typesResources
