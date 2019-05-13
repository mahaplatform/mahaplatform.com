import collectObjects from '../../../utils/collect_objects'
import { Router } from 'express'

const unauth = collectObjects('admin/api2/unauth.js')

const unauthorized = new Router({ mergeParams: true })

unauth.map(file => {
  unauthorized.use(file.config.path, file.default)
})

export default unauthorized
