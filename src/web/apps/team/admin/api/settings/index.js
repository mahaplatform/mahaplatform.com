import { Segment } from '../../../../../core/backframe'
import show from './show'
import update from './update'

const settingsSegment = new Segment({
  path: '/settings',
  rights: ['team:manage_team'],
  routes: [
    show,
    update
  ]
})

export default settingsSegment
