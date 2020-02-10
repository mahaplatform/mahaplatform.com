import preferences from './preferences'
import payments from './payments'
import { Router } from 'express'
import forms from './forms'

const router = new Router({ mergeParams: true })

router.use('/forms', forms)

router.use('/payments', payments)

router.use('/preferences', preferences)

export default router
