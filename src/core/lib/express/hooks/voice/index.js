import feedback from './feedback'
import { Router } from 'express'
import receive from './receive'

const router = new Router({ mergeParams: true })

router.post('/feedback', feedback)

router.post('/status', (req, res) => res.send(true))

router.post('/', receive)


export default router
