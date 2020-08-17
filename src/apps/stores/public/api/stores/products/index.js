import { Router } from 'express'
import check from './check'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:code/check', check)

export default router