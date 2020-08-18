import { Router } from 'express'
import update from './update'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/:code', show)

router.patch('/:code', update)

export default router
