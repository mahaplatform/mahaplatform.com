import { Resources } from '../../../../../core/backframe'
import Import from '../../../../maha/models/import'
import ImportSerializer from '../../../../maha/serializers/import_serializer'

const importResources = new Resources({
  filterParams: ['object_type','user_id'],
  model: Import,
  only: ['list','show'],
  path: '/imports',
  serializer: ImportSerializer,
  sortParams: ['created_at'],
  withRelated: ['asset','user.photo']
})

export default importResources
