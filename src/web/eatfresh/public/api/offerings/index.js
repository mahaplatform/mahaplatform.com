import { Resources } from 'maha'
import offering from '../../../models/offering'
import offeringSerializer from '../../../serializers/offering_serializer'

const offeringResources = new Resources({
  defaultSort: 'title',
  model: offering,
  only: ['list','show'],
  path: '/offerings',
  primaryKey: 'slug',
  searchParams: ['title'],
  serializer: offeringSerializer,
  withRelated: ['photo']
})

export default offeringResources
