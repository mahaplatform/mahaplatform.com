import organizers from './organizers'
import locations from './locations'
import dashboard from './dashboard'
import { Router } from 'express'
import events from './events'

const router = new Router({ mergeParams: true })

router.use('/dashboard', dashboard)

router.use('/events', events)

router.use('/locations', locations)

router.use('/organizers', organizers)

export default router
