import members from './api/members'
import items from './api/items'
import { Segment } from 'maha'

const api = new Segment({
  routes: [
    items,
    members
  ]
})

export default api
