import ItemSerializer from '../../serializers/item_serializer'
import Item from '../../models/item'
import { Resources } from 'maha'

const contributorsResources = new Resources({
  model: Item,
  path: '/contributors',
  serializer: ItemSerializer,
  withRelated: ['asset','owner']
})

export default contributorsResources
