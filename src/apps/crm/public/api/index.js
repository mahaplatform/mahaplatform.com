import { Router } from 'express'
import uploads from './uploads'

const router = new Router({ mergeParams: true })

router.use('/uploads', uploads)

export default router
