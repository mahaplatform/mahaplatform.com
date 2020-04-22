import { Router } from 'express'
import share from './share'

const router = new Router({ mergeParams: true })

router.use('/share', share)

export default router
