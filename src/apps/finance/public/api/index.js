import { Router } from 'express'
import invoices from './invoices'

const router = new Router({ mergeParams: true })

router.use('/invoices', invoices)

export default router
