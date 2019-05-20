import { Router } from 'express'
import approvals from './approvals'
import report from './report'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/items', list)

router.get('/approvals', approvals)

router.get('/report', report)

export default router
