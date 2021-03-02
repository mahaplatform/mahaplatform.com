import { Router } from 'express'
import sessions from './sessions'

const router = new Router({ mergeParams: true })

router.use('/sessions', sessions)

export default router
