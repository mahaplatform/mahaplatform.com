import { Resources } from '../../../../../core/backframe'
import County from '../../../models/county'
import CountySerializer from '../../../serializers/county_serializer'

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
  '/admin/eatfresh/counties'
]

const refresh = {
  create: channels,
  update: channels
}

const countyResources = new Resources({
  activities,
  allowedParams: ['name'],
  defaultSort: 'name',
  model: County,
  path: '/counties',
  refresh,
  serializer: CountySerializer,
  searchParams: ['name'],
  sortParams: ['id','name']
})

export default countyResources
