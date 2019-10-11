import transaction from '../transaction'
import { Router } from 'express'
import logger from '../logger'
import create from './create'
import update from './update'
import status from './status'

const router = new Router({ mergeParams: true })

router.use(transaction)

router.use(logger)

router.post('/fax', create)

router.post('/fax/status', status)

router.post('/fax/update', update)

export default router
