import { Router } from 'express'
import events from './events'

const router = new Router({ mergeParams: true })

router.use('/events', events)

export default router
