import preferences from './preferences'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/preferences', preferences)

export default router
