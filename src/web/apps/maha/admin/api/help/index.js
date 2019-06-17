import { Router } from 'express'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

export default router
