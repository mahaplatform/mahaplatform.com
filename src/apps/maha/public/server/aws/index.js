import bodyParser from 'body-parser'
import feedback from './feedback'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use(bodyParser.json({ limit: '5mb', type: '*/*' }))

router.post('/feedback', feedback)

export default router
