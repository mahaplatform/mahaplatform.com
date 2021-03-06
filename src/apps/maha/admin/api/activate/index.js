import notifications from './notifications'
import { Router } from 'express'
import security from './security'
import password from './password'
import assets from './assets'
import verify from './verify'
import avatar from './avatar'
import token from './token'
import cell from './cell'

const router = new Router({ mergeParams: true })

router.use(token)

router.post('/notifications', notifications)

router.post('/security', security)

router.post('/password', password)

router.use('/assets', assets)

router.post('/verify', verify)

router.post('/avatar', avatar)

router.use('/cell', cell)

export default router
