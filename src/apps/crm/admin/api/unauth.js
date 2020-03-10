import recordings from './recordings/unauth'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/recordings', recordings)

export default router
