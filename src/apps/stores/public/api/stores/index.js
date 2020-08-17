import { Router } from 'express'
import products from './products'
import carts from './carts'

const router = new Router({ mergeParams: true })

router.use('/:code/carts', carts)

router.use('/:code/products', products)

export default router
