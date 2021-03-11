import { Router } from 'express'
import websites from './websites'

const router = new Router({ mergeParams: true })

router.use('/websites', websites)

export default router
