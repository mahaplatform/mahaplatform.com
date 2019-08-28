import preferences from './preferences'
import subscribe from './subscribe'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/preferences', preferences)

router.use('/subscribe', subscribe)

export default router
