import { Segment } from '../../../../../core/backframe'
import items from './items'
import restore from './restore'
import trash from './trash'
import move from './move'
import destroy from './destroy'
import restore_all from './restore_all'
import empty from './empty'

const itemsSegment = new Segment({
  path: '/items',
  routes: [
    restore_all,
    empty,
    items,
    restore,
    trash,
    move,
    destroy
  ]
})

export default itemsSegment
