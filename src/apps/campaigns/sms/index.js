import enrollments from './enrollments'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/enrollments', enrollments)

export default router
