import { Router } from 'express'
import step from './step'

const router = new Router({ mergeParams: true })

router.post('/:enrollment_id', step)

export default router
