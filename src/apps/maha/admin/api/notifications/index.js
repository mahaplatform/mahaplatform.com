import { Router } from 'express'
import visited from './visited'
import unread from './unread'
import list from './list'
import seen from './seen'
import test from './test'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id/visited', visited)

router.get('/unread', unread)

router.patch('/seen', seen)

router.post('/test', test)

export default router
