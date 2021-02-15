import { Router } from 'express'
import publish from './publish'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

router.patch('/:id/publish', publish)

export default router
