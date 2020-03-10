import { Router } from 'express'
import create from './create'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/:code', show)

router.post('/:code', create)

export default router
