import collectObjects from '../../../utils/collect_objects'
import transaction from '../transaction'
import { Router } from 'express'
import receive from './receive'
import logger from '../logger'
import status from './status'

const smsFiles = collectObjects('sms/*')

const router = new Router({ mergeParams: true })

router.use(transaction)

router.use(logger)

smsFiles.map(middleware => {
  router.use(middleware.config.path, middleware.default)
})

router.post('/status', status)

router.post('/', receive)

export default router
