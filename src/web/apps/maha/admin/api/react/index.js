import { Router } from 'express'
import update from './update'

const router = new Router({ mergeParams: true })

router.patch('/', update)

export default router
