import preferences from './preferences'
import subscribe from './subscribe'
import { Router } from 'express'
import forms from './forms'

const router = new Router({ mergeParams: true })

router.use('/forms', forms)

router.use('/preferences', preferences)

router.use('/subscribe', subscribe)

export default router
