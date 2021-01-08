import { Router } from 'express'
import raw from './raw'

const router = new Router({ mergeParams: true })

router.use('/raw', raw)

export default router
