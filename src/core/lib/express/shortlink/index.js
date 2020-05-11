import transaction from '../transaction'
import redirect from './redirect'
import { Router } from 'express'
import logger from '../logger'

const router = new Router({ mergeParams: true })

router.use(transaction)

router.use(logger)

router.get('/:code', redirect)

export default router
