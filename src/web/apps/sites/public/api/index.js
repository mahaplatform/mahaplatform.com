import { Segment } from '../../../../core/backframe'
import members from './members'
import items from './items'

const api = new Segment({
  routes: [
    items,
    members
  ]
})

export default api
