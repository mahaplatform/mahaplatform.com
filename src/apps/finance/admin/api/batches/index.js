import { Router } from 'express'
import expense from './expense'
import revenue from './revenue'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.use('/expense', expense)

router.use('/revenue', revenue)

export default router
