import { Router } from 'express'
import revenue from './revenue'

const router = new Router({ mergeParams: true })

router.get('/revenue', revenue)

export default router
