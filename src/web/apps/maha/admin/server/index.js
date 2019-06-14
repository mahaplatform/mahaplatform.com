import { Router } from 'express'
import signin from './signin'
import oauth from './sources'

const router = new Router({ mergeParams: true })

router.use(signin)

router.use(oauth)

export default router
