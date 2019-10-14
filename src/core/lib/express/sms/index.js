import transaction from '../transaction'
import delivered from './delivered'
import feedback from './feedback'
import { Router } from 'express'
import receive from './receive'
import logger from '../logger'

const router = new Router({ mergeParams: true })

router.use(transaction)

router.use(logger)

router.post('/feedback', feedback)

router.post('/delivered', delivered)

router.post('/', receive)

export default router
