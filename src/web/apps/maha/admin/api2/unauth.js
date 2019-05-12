import { Router } from 'express'
import devices from './devices/unauth'

const router = new Router({ mergeParams: true })

router.use('/devices', devices)

export default router
