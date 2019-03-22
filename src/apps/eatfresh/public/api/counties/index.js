import { Resources } from 'maha'
import County from '../../../models/county'
import CountySerializer from '../../../serializers/county_serializer'

const countyResources = new Resources({
  model: County,
  only: ['list'],
  path: '/counties',
  searchParams: ['title'],
  serializer: CountySerializer
})

export default countyResources
