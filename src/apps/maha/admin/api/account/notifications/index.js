import subscriptions from './subscriptions'
import preferences from './preferences'
import { Router } from 'express'
import types from './types'
import show from './show'
import push from './push'

const router = new Router({ mergeParams: true })

router.get('/', show)

router.get('/types', types)

router.post('/push', push)

router.patch('/preferences', preferences)

router.patch('/subscriptions', subscriptions)

export default router
