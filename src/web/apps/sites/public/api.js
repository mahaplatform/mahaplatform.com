import { Segment } from '../../../core/backframe'
import members from './api/members'
import items from './api/items'

const api = new Segment({
  routes: [
    items,
    members
  ]
})

export default api
