import payments from './payments'
import { Router } from 'express'
import create from './create'
import exp from './export'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.use('/:id/export', exp)

router.get('/:deposit_id/payments', payments)

export default router
