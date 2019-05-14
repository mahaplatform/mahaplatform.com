import { Router } from 'express'
import update from './update'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/:code/settings', show)

router.patch('/:code/settings', update)

export default router
