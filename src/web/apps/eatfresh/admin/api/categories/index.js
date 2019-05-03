import CategorySerializer from '../../../serializers/category_serializer'
import Category from '../../../models/category'
import { Resources } from '../../../../../core/backframe'

const activity = story => (req, trx, object, options) => ({
  story,
  object
})

const activities = {
  create: activity('created {object}'),
  update: activity('updated {object}'),
  destroy: activity('deleted {object}')
}

const channels = (req, trx, result, options) => [
  '/admin/eatfresh/categories'
]

const refresh = {
  create: channels,
  update: channels
}

const categoryResources = new Resources({
  activities,
  allowedParams: ['title','photo_id'],
  defaultSort: 'title',
  model: Category,
  path: '/categories',
  refresh,
  searchParams: ['title'],
  serializer: CategorySerializer,
  sortParams: ['id','title'],
  withRelated: ['photo']
})

export default categoryResources
