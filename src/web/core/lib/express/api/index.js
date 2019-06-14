import unauthorized from './unauthorized'
import transaction from '../transaction'
import authorized from './authorized'
import notFound from './not_found'
import { Router } from 'express'
import logger from '../logger'
import format from './format'
import error from './error'
import pub from './public'
import cors from './cors'

const router = new Router({ mergeParams: true })

router.use(transaction)

router.use(logger)

router.use(format)

router.use(cors)

router.use('/admin', unauthorized)

router.use('/admin', authorized)

router.use(pub)

router.use(notFound)

router.use(error)

export default router
