import submit_all from './submit_all'
import approvals from './approvals'
import finalize from './finalize'
import { Router } from 'express'
import report from './report'
import list from './list'
import tax from './tax'

const router = new Router({ mergeParams: true })

router.get('/items', list)

router.get('/items/report', report)

router.get('/items/tax', tax)

router.patch('/items/submit_all', submit_all)

router.patch('/items/import/finalize', finalize)

router.get('/approvals', approvals)

export default router
