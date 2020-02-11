import preferences from './preferences'
import payments from './payments'
import { Router } from 'express'
import forward from './forward'
import forms from './forms'

const router = new Router({ mergeParams: true })

router.use('/forms', forms)

router.use('/forward', forward)

router.use('/payments', payments)

router.use('/preferences', preferences)

export default router
