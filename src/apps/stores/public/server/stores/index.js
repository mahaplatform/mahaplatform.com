import { Router } from 'express'
import checkout from './checkout'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/:code', show)

router.use('/:code/checkout', checkout)

export default router
