import products from './products'
import stores from './stores'

import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/products', products)

router.use('/stores', stores)

export default router
