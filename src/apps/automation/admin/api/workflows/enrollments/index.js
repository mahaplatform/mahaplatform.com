import { Router } from 'express'
import actions from './actions'
import cancel from './cancel'
import create from './create'
import retry from './retry'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/actions', actions)

router.patch('/:id/cancel', cancel)

router.patch('/:id/retry', retry)

export default router
