import { Resources } from '../../../server'
import Search from '../../../models/search'
import SearchSerializer from '../../../serializers/search_serializer'
import clear from './clear'
import save from './save'

const searchResources = new Resources({
  allowedParams: ['text', 'route', 'extra'],
  collectionActions: [
    clear,
    save    
  ],
  defaultSort: ['-updated_at'],
  model: Search,
  only: ['list'],
  ownedByUser: true,
  path: '/searches',
  serializer: SearchSerializer
})

export default searchResources
