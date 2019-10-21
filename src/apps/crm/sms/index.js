import workflow from './workflow'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/enrollments/:enrollment_id', workflow)

export default router
