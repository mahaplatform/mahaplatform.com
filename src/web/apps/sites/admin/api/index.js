import { Segment } from '../../../../core/backframe'
import itemsFinalize from './items/finalize'
import managers from './managers'
import members from './members'
import emails from './emails'
import sites from './sites'
import types from './types'
import items from './items'

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
