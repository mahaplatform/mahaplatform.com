import preferences from './preferences'
import programs from './programs'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/preferences', preferences)

router.use('/programs', programs)

export default router
