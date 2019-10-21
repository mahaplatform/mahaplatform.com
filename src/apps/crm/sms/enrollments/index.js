import { Router } from 'express'
import step from './step'

const router = new Router({ mergeParams: true })

router.get('/:enrollment_id/steps/:step_id', step)

router.post('/:enrollment_id/steps/:step_id', step)

export default router
