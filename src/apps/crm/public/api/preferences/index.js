import { Router } from 'express'
import update from './update'

const router = new Router({ mergeParams: true })

router.patch('/:type/:email_code([a-z0-9]{10}):channel_code([a-z0-9]{10})', update)

export default router
