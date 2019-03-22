import { Import, ImportSerializer, Resources } from 'maha'

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
