import password from './password'
import { Router } from 'express'
import lockout from './lockout'
import email from './email'
import team from './team'

const router = new Router({ mergeParams: true })

router.post('/team', team)

router.post('/email', email)

router.post('/lockout', lockout)

router.post('/password', password)

export default router
