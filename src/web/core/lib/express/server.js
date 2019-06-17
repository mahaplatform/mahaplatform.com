import collectObjects from '../../utils/collect_objects'
import transaction from './transaction'
import { Router } from 'express'
import logger from './logger'

const files = collectObjects('admin/server')

const router = new Router({ mergeParams: true })

router.use(transaction)

router.use(logger)

files.map(file => {
  router.use(file.default)
})

export default router
