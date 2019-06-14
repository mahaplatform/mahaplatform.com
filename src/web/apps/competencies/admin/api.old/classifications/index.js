import { Resources } from '../../../../../core/backframe'
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

const classificationResources = new Resources({
  activities,
  allowedParams: ['title'],
  defaultSort: 'title',
  model: Classification,
  path: '/classifications',
  refresh,
  searchParams: ['title'],
  sortParams: ['id','title']
})

export default classificationResources
