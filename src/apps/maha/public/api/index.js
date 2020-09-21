import { Router } from 'express'
import forward from './forward'

const router = new Router({ mergeParams: true })

router.use('/forward', forward)

export default router
