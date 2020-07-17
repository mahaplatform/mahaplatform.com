import admin_summary from './admin_summary'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/admin_summary', admin_summary)

export default router
