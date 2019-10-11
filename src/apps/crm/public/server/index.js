import preferences from './preferences'
import subscribe from './subscribe'
import { Router } from 'express'
import forms from './forms'
import email from './email'

const router = new Router({ mergeParams: true })

router.use('/forms', forms)

router.use('/preferences', preferences)

router.use('/subscribe', subscribe)

router.use('/email', email)

export default router
