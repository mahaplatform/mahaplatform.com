import { Router } from 'express'
import publicMiddleware from '@analytics/public'
import transaction from './transaction'
import logger from './logger'
import cors from './cors'

const router = new Router({ mergeParams: true })

router.use(cors)

router.use(transaction)

router.use(logger)

router.use('/mt', publicMiddleware)

export default router
