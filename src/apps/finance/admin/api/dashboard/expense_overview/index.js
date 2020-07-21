import expense_overview from './expense_overview'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/', expense_overview)

export default router
