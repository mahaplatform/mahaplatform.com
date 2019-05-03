import { Resources } from '../../../../../core/backframe'
import Category from '../../../models/category'
import CategorySerializer from '../../../serializers/category_serializer'

const categoryResources = new Resources({
  defaultSort: 'title',
  model: Category,
  only: ['list','show'],
  path: '/categories',
  searchParams: ['title'],
  serializer: CategorySerializer,
  withRelated: ['photo']
})

export default categoryResources
