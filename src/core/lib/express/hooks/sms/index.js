import delivered from './delivered'
import feedback from './feedback'
import { Router } from 'express'
import receive from './receive'

const router = new Router({ mergeParams: true })

router.post('/feedback', feedback)

router.post('/delivered', delivered)

router.post('/', receive)

export default router
