import collectObjects from '../../../utils/collect_objects'
import { Router } from 'express'
import access from './access'
import token from './token'
import app from './app'

const apiFiles = collectObjects('admin/api2/index.js')

const router = new Router({ mergeParams: true })

router.use(token)

router.use(access)

apiFiles.map(file => {
  router.use(file.config.path, app(file.config.code), file.default)
})

export default router
