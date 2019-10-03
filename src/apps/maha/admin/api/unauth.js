import devices from './devices/unauth'
import activate from './activate'
import { Router } from 'express'
import signin from './signin'
import reset from './reset/unauth'

const router = new Router({ mergeParams: true })

router.use('/activate', activate)

router.use('/devices', devices)

router.use('/reset', reset)

router.use('/signin', signin)

export default router
