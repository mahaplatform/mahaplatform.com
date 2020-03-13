import enrollments from './enrollments'
import recordings from './recordings'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/enrollments', enrollments)

router.use('/recordings', recordings)

export default router
