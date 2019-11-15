import { Router } from 'express'
import payment from './payment'
import uploads from './uploads'

const router = new Router({ mergeParams: true })

router.use('/payment', payment)

router.use('/uploads', uploads)

export default router
