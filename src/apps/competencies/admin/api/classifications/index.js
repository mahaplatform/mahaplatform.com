import { Resources } from 'maha'
import Classification from '../../../models/classification'

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
    '/admin/competencies/classifications'
  ],
  update: (req, trx, result, options) => [
    '/admin/competencies/classifications',
    `/admin/competencies/classifications/${result.get('id')}`
  ]
}

const activityResources = new Resources({
  activities,
  allowedParams: ['title'],
  model: Classification,
  path: '/classifications',
  refresh,
  searchParams: ['title'],
  sortParams: ['id','title']
})

export default activityResources
