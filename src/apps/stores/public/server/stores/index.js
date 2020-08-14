import { Router } from 'express'
import checkout from './checkout'
import cart from './cart'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/:code', show)

router.get('/:code/cart', cart)

router.get('/:code/checkout', checkout)

export default router
