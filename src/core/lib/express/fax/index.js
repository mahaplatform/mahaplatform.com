import transaction from '../transaction'
import feedback from './feedback'
import { Router } from 'express'
import receive from './receive'
import logger from '../logger'
import create from './create'

const router = new Router({ mergeParams: true })

router.use(transaction)

router.use(logger)

router.post('/', create)

router.post('/feedback', feedback)

router.post('/receive', receive)

export default router
