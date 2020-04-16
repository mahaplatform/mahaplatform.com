import { Router } from 'express'
import auth from './auth'
import oauth from './oauth'

const router = new Router({ mergeParams: true })

router.use('/auth', auth)

router.use('/oauth', oauth)

export default router
