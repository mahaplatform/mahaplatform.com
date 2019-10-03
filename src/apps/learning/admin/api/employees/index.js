import { Router } from 'express'
import create from './create'
import plans from './plans'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

router.post('/plans', create)

router.get('/:id/plans', plans)

export default router
