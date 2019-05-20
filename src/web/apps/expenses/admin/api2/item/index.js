import { Router } from 'express'
import action from './action'
import status from './status'

const router = new Router({ mergeParams: true })

router.patch('/:type/:id/status', status)

router.patch('/:type/:id/:action(submit|approve|reject|review)', action)

export default router
