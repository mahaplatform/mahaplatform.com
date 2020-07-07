import { Router } from 'express'
import panels from './panels'
import cards from './cards'

const router = new Router({ mergeParams: true })

router.get('/cards', cards)

router.use('/panels', panels)

export default router
