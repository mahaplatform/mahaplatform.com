import { Segment } from 'maha'
import update from './update'
import show from './show'

const settingsSegment = new Segment({
  path: '/apps/:code/settings',
  routes: [
    show,
    update
  ]
})

export default settingsSegment
