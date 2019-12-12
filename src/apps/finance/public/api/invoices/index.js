import { Router } from 'express'
import payment from './payment'
import token from './token'

const router = new Router({ mergeParams: true })

router.post('/:code/payments', payment)

router.get('/:code/token', token)

export default router
