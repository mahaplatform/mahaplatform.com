import { Router } from 'express'
import payment from './payment'
import token from './token'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/:code', show)

router.post('/:code/payments', payment)

router.get('/:code/token', token)

export default router
