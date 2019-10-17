import collectObjects from '../../../utils/collect_objects'
import transaction from '../transaction'
import feedback from './feedback'
import { Router } from 'express'
import receive from './receive'
import logger from '../logger'
import status from './status'

const voiceFiles = collectObjects('voice/*')

const router = new Router({ mergeParams: true })

router.use(transaction)

router.use(logger)

voiceFiles.map(middleware => {
  router.use(middleware.config.path, middleware.default)
})

router.post('/feedback', feedback)

router.post('/status', status)

router.post('/', receive)

export default router
