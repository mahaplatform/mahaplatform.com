import admin_overview from './admin_overview'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/', admin_overview)

export default router
