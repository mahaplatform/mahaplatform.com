import { Router } from 'express'
import check from './check'
import list from './list'

const router = new Router({ mergeParams: true })

router.use('/', list)

router.use('/:code/check', check)

export default router
