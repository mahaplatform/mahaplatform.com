import { Router } from 'express'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/:type', list)

export default router
