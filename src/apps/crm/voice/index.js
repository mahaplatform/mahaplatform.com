import recording from './recording'
import enrollments from './enrollments'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/enrollments', enrollments)

router.use('/recording', recording)

export default router
