import devices from './devices/unauth'
import signin from './signin'
import activate from './activate'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/activate', activate)

router.use('/devices', devices)

router.use('/signin', signin)

export default router
