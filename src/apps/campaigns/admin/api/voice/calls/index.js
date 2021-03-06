import delete_all from './delete_all'
import { Router } from 'express'
import actions from './actions'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.patch('/delete', delete_all)

router.get('/:id', show)

router.get('/:id/actions', actions)

export default router
