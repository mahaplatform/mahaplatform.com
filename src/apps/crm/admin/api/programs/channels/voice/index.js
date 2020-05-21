import { Router } from 'express'
import list from './list'
import show from './show'
import calls from './calls'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

router.get('/:id/calls', calls)

export default router
