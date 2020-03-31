import organizers from './organizers'
import locations from './locations'
import { Router } from 'express'
import events from './events'

const router = new Router({ mergeParams: true })

router.use('/events', events)

router.use('/locations', locations)

router.use('/organizers', organizers)

export default router
