import admin_overview from './admin_overview'
import expense_overview from './expense_overview'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/admin_overview', admin_overview)
router.use('/expense_overview', expense_overview)

export default router
