import { Router } from 'express'
import status from './status'

const router = new Router({ mergeParams: true })

router.post('/status', status)

export default router
