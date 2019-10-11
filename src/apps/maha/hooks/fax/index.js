import { Router } from 'express'
import receive from './receive'
import send from './send'

const router = new Router({ mergeParams: true })

router.post('/receive', receive)

router.post('/send', send)

export default router
