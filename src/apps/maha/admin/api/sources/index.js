import { Router } from 'express'
import show from './show'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:source', show)

export default router
