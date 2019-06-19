import { Router } from 'express'
import update from './update'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', update)

export default router
