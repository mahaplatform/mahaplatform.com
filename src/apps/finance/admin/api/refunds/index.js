import allocations from './allocations'
import { Router } from 'express'
import list from './list'
import show from './show'
import voyd from './void'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

router.patch('/:id/void', voyd)

router.get('/:refund_id/allocations', allocations)

export default router
