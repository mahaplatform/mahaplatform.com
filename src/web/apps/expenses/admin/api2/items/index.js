import submit_all from './submit_all'
import approvals from './approvals'
import finalize from './finalize'
import { Router } from 'express'
import report from './report'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/items', list)

router.patch('/items/submit_all', submit_all)

router.patch('/items/import/finalize', finalize)

router.get('/approvals', approvals)

router.get('/report', report)

export default router
