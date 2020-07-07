import preferences from './preferences'
import payments from './payments'
import programs from './programs'
import { Router } from 'express'
import forms from './forms'

const router = new Router({ mergeParams: true })

router.use('/forms', forms)

router.use('/payments', payments)

router.use('/preferences', preferences)

router.use('/programs', programs)

export default router
