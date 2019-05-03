import OfferingSerializer from '../../../serializers/offering_serializer'
import Offering from '../../../models/offering'
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
  '/admin/eatfresh/offerings'
]

const refresh = {
  create: channels,
  update: channels
}

const offeringResources = new Resources({
  activities,
  allowedParams: ['title','photo_id'],
  defaultSort: 'title',
  model: Offering,
  path: '/offerings',
  refresh,
  searchParams: ['title'],
  serializer: OfferingSerializer,
  sortParams: ['id','title'],
  withRelated: ['photo']
})

export default offeringResources
