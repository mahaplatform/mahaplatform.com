import { Segment } from '../../../server'
import create from './create'
import update from './update'
import show from './show'
import push from './push'
import test from './test'

const devicesSegment = new Segment({
  path: '/devices',
  routes: [
    create,
    update,
    show,
    push,
    test
  ]
})

export default devicesSegment
