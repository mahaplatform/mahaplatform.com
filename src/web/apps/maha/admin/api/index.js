import { Segment } from '../../../../core/backframe'
import comments from './comments'
import fields from './fields'
import imports from './imports'
import importItems from './import_items'
import reviews from './reviews'

const authenticated = new Segment({
  authenticated: true,
  routes: [
    comments,
    fields,
    imports,
    importItems,
    reviews
  ]
})

const api = new Segment({
  routes: [
    authenticated
  ]
})

export default api
