import { Router } from 'express'
import show from './show'
import voyd from './void'

const router = new Router({ mergeParams: true })

router.get('/:id', show)

router.patch('/:id/void', voyd)

export default router
