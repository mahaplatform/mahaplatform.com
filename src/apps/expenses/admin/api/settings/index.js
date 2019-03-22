import { Segment } from 'maha'
import update from './update'
import show from './show'

const settingsSegment = new Segment({
  path: '/settings',
  routes: [
    show,
    update
  ]
})

export default settingsSegment
