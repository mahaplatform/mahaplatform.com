import admin_overview from './admin_overview'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/admin_overview', admin_overview)

export default router
