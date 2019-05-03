import managers from './api/managers'
import members from './api/members'
import emails from './api/emails'
import sites from './api/sites'
import types from './api/types'
import items from './api/items'
import itemsFinalize from './api/items/finalize'
import { Segment } from '../../../core/backframe'

const api = new Segment({
  routes: [
    sites,
    managers,
    members,
    emails,
    types,
    items,
    itemsFinalize
  ]
})

export default api
