import 'express-async-errors'
import './responder'
import notFound from './not_found'
import unauthorized from './unauthorized'
import transaction from './transaction'
import authorized from './authorized'
import error from './error'
import { Router } from 'express'
import logger from './logger'
import format from './format'

const router = new Router({ mergeParams: true })

router.use(transaction)

router.use(logger)

router.use(format)

router.use('/admin', unauthorized)

router.use('/admin', authorized)

router.use(notFound)

router.use(error)

export default router
