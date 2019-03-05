import { Resources } from 'maha'
import Category from '../../../models/category'

const activity = story => (req, trx, object, options) => ({
  story,
  object
})

const activities = {
  create: activity('created {object}'),
  update: activity('updated {object}'),
  destroy: activity('deleted {object}')
}

const refresh = {
  create: (req, trx, result, options) => [
    '/admin/competencies/categories'
  ],
  update: (req, trx, result, options) => [
    '/admin/competencies/categories',
    `/admin/competencies/categories/${result.get('id')}`
  ]
}

const categoryResources = new Resources({
  activities,
  allowedParams: ['title'],
  model: Category,
  path: '/categories',
  refresh,
  searchParams: ['id','title'],
  sortParams: ['title']
})

export default categoryResources
