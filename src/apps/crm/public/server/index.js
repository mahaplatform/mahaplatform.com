import preferences from './preferences'
import subscribe from './subscribe'
import { Router } from 'express'
import forms from './forms'
import email from './email'
import sms from './sms'

const router = new Router({ mergeParams: true })

router.use('/forms', forms)

router.use('/preferences', preferences)

router.use('/subscribe', subscribe)

router.use('/email', email)

router.use('/sms', sms)

export default router
