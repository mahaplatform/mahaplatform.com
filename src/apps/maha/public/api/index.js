import { Router } from 'express'
import uploads from './uploads'
import forward from './forward'

const router = new Router({ mergeParams: true })

router.use('/forward', forward)

router.use('/uploads', uploads)

export default router
