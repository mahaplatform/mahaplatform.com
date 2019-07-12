import { Router } from 'express'
import share from './share'

const router = new Router({ mergeParams: true })

router.use('/drive/share', share)

export default router
