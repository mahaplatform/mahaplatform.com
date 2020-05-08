import { Router } from 'express'
import actions from './actions'
import create from './create'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/actions', actions)

export default router
