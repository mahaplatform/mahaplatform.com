import collectObjects from '../../../utils/collect_objects'
import { Router } from 'express'
import access from './access'
import token from './token'
import app from './app'

const auth = collectObjects('admin/api2/index.js')

const authorized = new Router({ mergeParams: true })

authorized.use(token)

authorized.use(access)

auth.map(file => {
  authorized.use(file.config.path, app(file.config.code), file.default)
})

export default authorized
