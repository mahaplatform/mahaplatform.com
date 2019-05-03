import do_not_disturb from './do_not_disturb'
import types from './types'
import subscriptions from './subscriptions'
import { Segment } from '../../../../../core/backframe'
import preferences from './preferences'
import show from './show'
import push from './push'

const preferencesSegment = new Segment({
  path: '/account/notifications',
  routes: [
    show,
    types,
    push,
    preferences,
    do_not_disturb,
    subscriptions
  ]
})

export default preferencesSegment
