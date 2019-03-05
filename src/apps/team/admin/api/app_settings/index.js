import { Segment } from 'maha'
import show from './show'
import update from './update'

const settingsSegment = new Segment({
  path: '/apps/:app_id/settings',
  routes: [
    show,
    update
  ]
})

export default settingsSegment
