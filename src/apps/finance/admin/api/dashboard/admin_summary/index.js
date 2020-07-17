import admin_summary from './admin_summary'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/', admin_summary)

export default router
