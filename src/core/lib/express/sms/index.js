import collectObjects from '../../../utils/collect_objects'
import transaction from '../transaction'
import session from 'express-session'
import delivered from './delivered'
import feedback from './feedback'
import { Router } from 'express'
import receive from './receive'
import logger from '../logger'

const smsFiles = collectObjects('sms/*')

const router = new Router({ mergeParams: true })

router.use(transaction)

router.use(logger)

router.use(session({
  secret: process.env.SECRET
}))

smsFiles.map(middleware => {
  router.use(middleware.config.path, middleware.default)
})

router.post('/feedback', feedback)

router.post('/delivered', delivered)

router.post('/', receive)

export default router
