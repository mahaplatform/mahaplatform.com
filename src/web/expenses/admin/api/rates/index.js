import RateSerializer from '../../../serializers/rate_serializer'
import Rate from '../../../models/rate'
import { Resources } from 'maha'

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
  '/admin/expenses/rates'
]

const refresh = {
  create: channels,
  update: channels
}

const rateResources = new Resources({
  activities,
  allowedParams: ['year','value'],
  defaultSort: 'year',
  model: Rate,
  ownedByTeam: false,
  path: '/rates',
  refresh,
  sortParams: ['year','value'],
  serializer: RateSerializer
})

export default rateResources
