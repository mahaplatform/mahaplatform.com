import authorize from './authorize'
import { Router } from 'express'
import verify from './verify'

const router = new Router({ mergeParams: true })

router.post('/authorize', authorize)

router.post('/verify', verify)

export default router
