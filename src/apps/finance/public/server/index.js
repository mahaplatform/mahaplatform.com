import invoices from './invoices'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/invoices', invoices)

export default router
