import { Router } from 'express'
import show from './show'
import update from './update'

const router = new Router({ mergeParams: true })

router.get('/', show)

router.patch('/', update)

export default router
