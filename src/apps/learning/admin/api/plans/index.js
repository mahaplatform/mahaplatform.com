import commitments from './commitments'
import employees from './employees'
import { Router } from 'express'
import action from './action'
import create from './create'
import update from './update'
import report from './report'
import goals from './goals'
import show from './show'
import list from './list'
import edit from './edit'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/report', report)

router.get('/employees', employees)

router.get('/:id', show)

router.patch('/:id', update)

router.get('/:id/edit', edit)

router.use('/:plan_id/commitments', commitments)

router.use('/:plan_id/goals', goals)

router.patch('/:id/:action', action)

export default router
