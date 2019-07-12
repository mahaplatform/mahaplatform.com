import collectObjects from '../../utils/collect_objects'
import transaction from './transaction'
import { Router } from 'express'
import logger from './logger'

const publics = collectObjects('public/server')

const admins = collectObjects('admin/server')

const router = new Router({ mergeParams: true })

router.use(transaction)

router.use(logger)

publics.map(file => {
  router.use(file.default)
})

admins.map(file => {
  router.use('/admin', file.default)
})

export default router
