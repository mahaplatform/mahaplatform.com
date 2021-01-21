import collectObjects from '../../utils/collect_objects'
import { Router } from 'express'
import alias from './alias'

const publics = collectObjects('public/server')

const admins = collectObjects('admin/server')

const router = new Router({ mergeParams: true })

router.use(alias)

publics.map(file => {
  router.use(file.config.path, file.default)
})

admins.map(file => {
  router.use(`${file.config.path}/admin`, file.default)
})

export default router
