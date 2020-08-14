import { Router } from 'express'
import list from './list'

const router = new Router({ mergeParams: true })

router.use('/', list)

export default router
