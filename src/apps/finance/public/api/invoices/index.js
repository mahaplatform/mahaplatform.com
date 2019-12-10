import { Router } from 'express'
import payment from './payment'

const router = new Router({ mergeParams: true })

router.post('/:code/payment', payment)

export default router
