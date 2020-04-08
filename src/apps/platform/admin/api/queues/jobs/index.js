import { Router } from 'express'
import destroy from './destroy'
import retry from './retry'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/:id', show)

router.patch('/:id/retry', retry)

router.delete('/:id', destroy)

export default router
