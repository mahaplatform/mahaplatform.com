import locations from './locations'
import { Router } from 'express'
import events from './events'

const router = new Router({ mergeParams: true })

router.use('/events', events)

router.use('/locations', locations)

export default router
