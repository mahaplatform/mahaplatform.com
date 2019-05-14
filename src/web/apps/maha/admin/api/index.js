import { Segment } from '../../../../core/backframe'
import imports from './imports'
import importItems from './import_items'

const api = new Segment({
  routes: [
    imports,
    importItems
  ]
})

export default api
