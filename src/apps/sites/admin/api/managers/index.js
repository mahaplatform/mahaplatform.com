import { Router } from 'express'
import assign from './assign'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.patch('/', assign)

export default router
