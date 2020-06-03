import allcalls from './allcalls'
import { Router } from 'express'
import calls from './calls'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/calls', allcalls)

router.get('/:id', show)

router.get('/:id/calls', calls)

export default router
