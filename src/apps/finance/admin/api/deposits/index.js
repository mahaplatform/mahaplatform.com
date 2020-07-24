import transactions from './transactions'
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

router.get('/:deposit_id/transactions', transactions)

export default router
