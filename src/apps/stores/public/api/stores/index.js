import products from './products'
import { Router } from 'express'
import orders from './orders'
import carts from './carts'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:code', show)

router.use('/:store_code/carts', carts)

router.use('/:store_code/orders', orders)

router.use('/:store_code/products', products)

export default router
