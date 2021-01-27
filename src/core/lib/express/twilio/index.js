import { Router } from 'express'
import status from './status'
import lambda from './lambda'

const router = new Router({ mergeParams: true })

router.post('/status', status)

router.post('/:type', lambda)

export default router
