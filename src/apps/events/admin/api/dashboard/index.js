import ticket_type_totals from './ticket_type_totals'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/ticket_type_totals', ticket_type_totals)

export default router
