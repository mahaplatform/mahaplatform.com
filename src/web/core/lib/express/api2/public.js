import collectObjects from '../../../utils/collect_objects'
import { Router } from 'express'

const apis = collectObjects('public/api2/index.js')

const router = new Router({ mergeParams: true })

apis.map(file => {
  router.use(file.config.path, file.default)
})

export default router
