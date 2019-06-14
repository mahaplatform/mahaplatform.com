import transaction from '../transaction'
import { Router } from 'express'
import logger from '../logger'
import mime from './mime'

const router = new Router({ mergeParams: true })

router.use(transaction)

router.use(logger)

router.post('/', mime)

export default router
