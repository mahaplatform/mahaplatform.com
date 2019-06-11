import collectObjects from '../../../utils/collect_objects'
import { Router } from 'express'

const apiFiles = collectObjects('admin/api2/unauth.js')

const router = new Router({ mergeParams: true })

apiFiles.map(file => {
  router.use(file.config.path, file.default)
})

export default router
