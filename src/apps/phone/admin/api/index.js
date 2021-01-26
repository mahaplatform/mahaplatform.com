import { Router } from 'express'
import calls from './calls'

const router = new Router({ mergeParams: true })

router.use('/calls', calls)

export default router
