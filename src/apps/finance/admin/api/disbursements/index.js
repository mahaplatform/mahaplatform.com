import payments from './payments'
import { Router } from 'express'
import exp from './export'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

router.use('/:id/export', exp)

router.get('/:disbursement_id/payments', payments)

export default router
