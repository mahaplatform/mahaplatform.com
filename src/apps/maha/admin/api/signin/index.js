import password from './password'
import { Router } from 'express'
import lockout from './lockout'
import teams from './teams'
import email from './email'

const router = new Router({ mergeParams: true })

router.post('/email', email)

router.post('/lockout', lockout)

router.post('/password', password)

router.get('/teams', teams)

export default router
