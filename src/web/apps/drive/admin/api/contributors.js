import ItemSerializer from '../../serializers/item_serializer'
import Item from '../../models/item'
import { Resources } from '../../../../core/backframe'

const contributorsResources = new Resources({
  model: Item,
  path: '/contributors',
  serializer: ItemSerializer,
  withRelated: ['asset','owner']
})

export default contributorsResources
