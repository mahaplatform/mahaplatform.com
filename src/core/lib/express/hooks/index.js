import transaction from '../transaction'
import { Router } from 'express'
import logger from '../logger'
import voice from './voice'
import fax from './fax'
import sms from './sms'

const router = new Router({ mergeParams: true })

router.use(transaction)

router.use(logger)

router.use('/voice', voice)

router.use('/fax', fax)

router.use('/sms', sms)

export default router
