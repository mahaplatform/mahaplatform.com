import { Router } from 'express'
import stores from './stores'

const router = new Router({ mergeParams: true })

router.use('/stores', stores)

export default router
