import collectObjects from '../../../utils/collect_objects'
import notFound from './default/not_found'
import transaction from './transaction'
import token from './default/token'
import error from './default/error'
import { Router } from 'express'
import logger from './logger'
import format from './format'
import app from './app'

const apifiles = collectObjects('admin/api2/index.js')

const router = new Router({ mergeParams: true })

router.use(transaction)

router.use(logger)

router.use(format)

router.use(token)

apifiles.map(file => {
  router.use(`/admin${file.config.path}`, app(file.config.code), file.default)
})

router.use(notFound)

router.use(error)

export default router
