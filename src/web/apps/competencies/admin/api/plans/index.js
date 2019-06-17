import commitments from './commitments'
import complete from './complete'
import { Router } from 'express'
import approve from './approve'
import create from './create'
import update from './update'
import report from './report'
import goals from './goals'
import show from './show'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/report', report)

router.get('/:id', show)

router.patch('/:id', update)

router.patch('/:id/approve', approve)

router.patch('/:id/complete', complete)

router.use('/:plan_id/commitments', commitments)

router.use('/:plan_id/goals', goals)

export default router
