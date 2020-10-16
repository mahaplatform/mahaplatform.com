import { Router } from 'express'
import check from './check'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:code', show)

router.get('/:code/check', check)

export default router
