import { Router } from 'express'
import update from './update'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', show)

router.patch('/', update)

export default router
