import { Router } from 'express'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

export default router
