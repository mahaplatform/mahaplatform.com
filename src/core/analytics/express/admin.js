import { Router } from 'express'
import adminMiddleware from '@analytics/admin/api'
import transaction from './transaction'
import logger from './logger'

const router = new Router({ mergeParams: true })

router.use(transaction)

router.use(logger)

router.use('/mt/admin', adminMiddleware)

export default router
