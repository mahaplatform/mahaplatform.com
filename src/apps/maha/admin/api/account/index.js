import notifications from './notifications'
import security from './security'
import { Router } from 'express'
import update from './update'
import photo from './photo'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', show)

router.patch('/', update)

router.patch('/photo', photo)

router.use('/notifications', notifications)

router.use('/security', security)

export default router
