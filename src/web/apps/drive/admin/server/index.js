import { Router } from 'express'
import share from './share'
import dav from './dav'

const router = new Router({ mergeParams: true })

router.use('/drive/:subdomain', dav)

router.use('/drive/share', share)

export default router
