import { Router } from 'express'
import invoices from './invoices'
import payments from './payments'

const router = new Router({ mergeParams: true })

router.use('/invoices', invoices)

router.use('/payments', payments)

export default router
