import tickets from './tickets'
import ticket_types from './ticket_types'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/:event_id/ticket_types', ticket_types)

router.get('/:event_id/ticket_types/:id/tickets', tickets)

export default router
