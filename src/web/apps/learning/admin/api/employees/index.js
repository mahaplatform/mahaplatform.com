import { Router } from 'express'
import plans from './plans'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

router.get('/:id/plans', plans)

export default router
