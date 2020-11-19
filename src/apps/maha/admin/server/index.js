import { Router } from 'express'
import emails from './emails'
import oauth from './oauth'
import auth from './auth'

const router = new Router({ mergeParams: true })

router.use('/auth', auth)

router.use('/emails', emails)

router.use('/oauth', oauth)

export default router
