import twofactor from './twofactor'
import security from './security'
import password from './password'
import { Router } from 'express'
import verify from './verify'
import token from './token'
import email from './email'

const router = new Router({ mergeParams: true })

router.post('/email', email)

router.use(token)

router.post('/verify', verify)

router.post('/password', password)

router.post('/security', security)

router.use('/twofactor', twofactor)

export default router
