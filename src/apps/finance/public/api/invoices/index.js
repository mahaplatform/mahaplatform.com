import { Router } from 'express'
import payment from './payment'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/:code', show)

router.post('/:code/payment', payment)

export default router
