import products from './products'
import { Router } from 'express'
import orders from './orders'
import carts from './carts'

const router = new Router({ mergeParams: true })

router.use('/:store_code/carts', carts)

router.use('/:store_code/orders', orders)

router.use('/:store_code/products', products)

export default router
