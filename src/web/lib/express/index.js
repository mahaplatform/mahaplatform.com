import staticMiddleware from './static'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/ping', (req, res) => {
  res.send('pong')
})

router.use('/websites/:code', staticMiddleware)

export default router
