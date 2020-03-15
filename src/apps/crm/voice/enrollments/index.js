import { Router } from 'express'
import show from './show'
import next from './next'

const router = new Router({ mergeParams: true })

router.get('/:enrollment_code', show)

router.get('/:enrollment_code/:code', show)

router.get('/:enrollment_code/:code/next', next)

export default router
