import { Router } from 'express'
import visited from './visited'
import unread from './unread'
import list from './list'
import seen from './seen'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id/visited', visited)

router.get('/unread', unread)

router.patch('/seen', seen)

export default router
