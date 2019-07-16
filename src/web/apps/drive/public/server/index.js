import { Router } from 'express'
import dav from './dav'

const router = new Router({ mergeParams: true })

router.use(dav)

export default router
