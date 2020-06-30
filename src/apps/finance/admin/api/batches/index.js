import { Router } from 'express'
import expense from './expense'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.use('/expense', expense)

export default router
