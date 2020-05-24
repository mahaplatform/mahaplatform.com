import feedback from './feedback'
import { Router } from 'express'
import receive from './receive'
import create from './create'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.post('/feedback', feedback)

router.post('/receive', receive)

export default router
