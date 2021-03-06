import notifications from './notifications'
import security from './security'
import { Router } from 'express'
import update from './update'
import photo from './photo'
import show from './show'
import cell from './cell'

const router = new Router({ mergeParams: true })

router.get('/', show)

router.patch('/', update)

router.use('/photo', photo)

router.use('/notifications', notifications)

router.use('/security', security)

router.use('/cell', cell)

export default router
