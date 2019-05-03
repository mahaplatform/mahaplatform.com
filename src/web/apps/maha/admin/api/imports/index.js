import { Resources } from '../../../../../core/backframe'
import Import from '../../../models/import'
import ImportSerializer from '../../../serializers/import_serializer'
import preview from './preview'
import parse from './parse'
import processs from './process'
import omiterrors from './omiterrors'
import fields from './fields'
import tables from './tables'
import template from './template'

const activity = story => (req, trx, object, options) => ({
  story,
  object
})

const activities = {
  create: activity('created {object}'),
  destroy: activity('deleted {object}')
}

const importResources = new Resources({
  activities,
  allowedParams: ['object_type','asset_id','stage','delimiter','headers','mapping','name','strategy'],
  collectionActions: [
    fields,
    template,
    tables
  ],
  defaultSort: '-created_at',
  dependents: [
    { relationship: 'items', strategy: 'destroy' }
  ],
  filterParams: ['object_type','stage'],
  model: Import,
  memberActions: [
    preview,
    parse,
    processs,
    omiterrors
  ],
  ownedByUser: true,
  path: '/imports',
  serializer: ImportSerializer,
  withRelated: ['asset','user.photo']
})

export default importResources
