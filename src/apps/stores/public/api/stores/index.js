import { Router } from 'express'
import products from './products'

const router = new Router({ mergeParams: true })

router.use('/:code/products', products)

export default router
